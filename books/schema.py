from graphene_django import DjangoObjectType
import graphene
from graphene_file_upload.scalars import Upload
import boto3
from django.contrib.auth import get_user_model, authenticate
from graphql_extensions.auth.decorators import login_required
import graphql_jwt

from books_app.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_S3_BUCKET

from .models import Book, Review, PurchaseVenue


class BookType(DjangoObjectType):
    class Meta:
        model = Book

class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

class ReviewType(DjangoObjectType):
    class Meta:
        model = Review

class PurchaseVenueType(DjangoObjectType):
    class Meta:
        model = PurchaseVenue


class Query(graphene.ObjectType):
    books = graphene.List(BookType)
    users = graphene.List(UserType)
    reviews = graphene.List(ReviewType)
    purchase_venues = graphene.List(PurchaseVenueType)
    
    book = graphene.Field(BookType,id=graphene.String())
    user = graphene.Field(UserType, id=graphene.String())
    review = graphene.Field(ReviewType, id=graphene.String())
    purchase_venue = graphene.Field(PurchaseVenueType, id=graphene.String())

    me = graphene.Field(UserType, token=graphene.String())

    def resolve_books(self, info):
        if info.context.user.is_authenticated:
            user_id = info.context.user.id
            return Book.objects.filter(user=user_id)
        return Book.objects.none()

    def resolve_users(self, info):
        User = get_user_model()
        return User.objects.all()

    def resolve_me(self, info, **args):
        user = info.context.user

        if user.is_anonymous:
            return None
        return user
    
    def resolve_reviews(self, info):
        return Review.objects.all()

    def resolve_purchase_venues(self, info):
        return PurchaseVenue.objects.all()

    def resolve_book(self, info, **args):
        id = args.get('id')
        if id is not None:
            return Book.objects.get(pk=id)
        return None

    def resolve_user(self, info, **args):
        User = get_user_model()
        id = args.get('id')
        if id is not None:
            return User.objects.get(pk=id)
        return None

    def resolve_reivew(self, info, **args):
        id = args.get('id')
        if id is not None:
            return Review.objects.get(pk=id)
        return None

    def resolve_purchase_venue(self, info, **args):
        id = args.get('id')
        if id is not None:
            return PurchaseVenue.objects.get(pk=id)
        return None


class CreateBook(graphene.Mutation):
    book = graphene.Field(BookType)

    class Arguments:
        title = graphene.String()
        author_name = graphene.String()
        description = graphene.String()
        genre = graphene.String()
        image = Upload()
        isbn = graphene.String()
        publication_date = graphene.String()
        publisher = graphene.String()
        user_id = graphene.String()

    @login_required
    def mutate(self, info, **args):
        if 'image' in args:
            s3 = boto3.client(
                's3',
                aws_access_key_id=AWS_ACCESS_KEY,
                aws_secret_access_key=AWS_SECRET_KEY,
            )
            file = args['image']
            s3.upload_fileobj(file, AWS_S3_BUCKET, file._name)
            image_path = 'https://s3.amazonaws.com' + '/' + AWS_S3_BUCKET + '/' + file._name
            args.update({ 'image': image_path })
        
        args.update({ 'user_id': info.context.user.id })
        book = Book(**args)
        book.save()
        return CreateBook(book=book)


class DeleteBook(graphene.Mutation):
    book = graphene.Field(BookType)

    class Arguments:
        id = graphene.String()

    @login_required
    def mutate(self, info, **args):
        if (args.get('id')):
            book_to_delete = Book.objects.get(pk=args.get('id'))
            if book_to_delete.user == info.context.user.id:
                book_to_delete.delete()


class UpdateBook(graphene.Mutation):
    book = graphene.Field(BookType)

    class Arguments:
        id=graphene.String()
        title = graphene.String()
        author_name = graphene.String()
        description = graphene.String()
        genre = graphene.String()
        image = Upload()
        isbn = graphene.String()
        publication_date = graphene.String()
        publisher = graphene.String()

    @login_required
    def mutate(self, info, **args):
        # if 'image' in args:
        #     s3 = boto3.client(
        #         's3',
        #         aws_access_key_id=AWS_ACCESS_KEY,
        #         aws_secret_access_key=AWS_SECRET_KEY,
        #     )
        #     file = args['image']
        #     s3.upload_fileobj(file, AWS_S3_BUCKET, file._name)
        #     image_path = 'https://s3.amazonaws.com' + '/' + AWS_S3_BUCKET + '/' + file._name
        #     args.update({ 'image': image_path })
        
        if (args.get('id')):
            Book.objects.filter(pk=args.get('id')).update(**args)
            updated_book = Book.objects.get(pk=args.get('id'))
            if updated_book.user == info.context.user.id:
                return UpdateBook(book=updated_book)
        return None


class Login(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String()
        password = graphene.String()

    @staticmethod
    def mutate(root, info, **args):
        user = authenticate(
            username=args.get('username'),
            password=args.get('password'),
        )

        if not user:
            raise Exception('Invalid username or password!')

        info.context.session['token'] = user.auth_token.key
        return Login(user=user)


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        first_name = graphene.String()
        last_name = graphene.String()

    @login_required
    def mutate(self, info, **args):
        user = get_user_model()(
            username=args.get('username'),
            email=args.get('email'),
            first_name=args.get('first_name') or '',
            last_name=args.get('last_name') or ''
        )
        if user.id == info.context.user.id:
            user.set_password(args.get('password'))
            user.save()
            return CreateUser(user=user)


class UpdateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        id = graphene.String()
        username = graphene.String()
        password = graphene.String()
        email = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()

    def mutate(self, info, **args):
        if (args.get('id')):
            User = get_user_model()
            User.objects.filter(pk=args.get('id')).update(**args)
            updated_user = User.objects.get(pk=args.get('id'))
            return UpdateUser(user=updated_user)
        return None


class Mutation(graphene.ObjectType):
    create_book = CreateBook.Field()
    delete_book = DeleteBook.Field()
    update_book = UpdateBook.Field()
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    login = Login.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
