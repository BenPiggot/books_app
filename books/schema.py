from graphene_django import DjangoObjectType
import graphene

from .models import Book, Review, PurchaseVenue

class BookType(DjangoObjectType):
    class Meta:
        model = Book

class ReviewType(DjangoObjectType):
    class Meta:
        model = Review

class PurchaseVenueType(DjangoObjectType):
    class Meta:
        model = PurchaseVenue

class Query(graphene.ObjectType):
    books = graphene.List(BookType)
    reviews = graphene.List(ReviewType)
    purchase_venues = graphene.List(PurchaseVenueType)
    
    book = graphene.Field(BookType,id=graphene.String())
    review = graphene.Field(ReviewType, id=graphene.String())
    purchase_venue = graphene.Field(PurchaseVenueType, id=graphene.String())

    def resolve_books(self, info):
        return Book.objects.all()
    
    def resolve_reviews(self, info):
        return Review.objects.all()

    def resolve_purchase_venues(self, info):
        return PurchaseVenue.objects.all()

    def resolve_book(self, info, **args):
        id = args.get('id')
        if id is not None:
          return Book.objects.get(pk=id)
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
        image = graphene.String()
        isbn = graphene.String()
        publication_date = graphene.String()
        publisher = graphene.String()

    def mutate(self, info, **args):
        book = Book(**args)
        book.save()

        return CreateBook(book=book)

class DeleteBook(graphene.Mutation):
    book = graphene.Field(BookType)

    class Arguments:
        id = graphene.String()

    def mutate(self, info, **args):
        if (args.get('id')):
            book_to_delete = Book.objects.get(pk=args.get('id'))
            book_to_delete.delete()
            return DeleteBook(book=book)
        return None

class Mutation(graphene.ObjectType):
    create_book = CreateBook.Field()
    delete_book = DeleteBook.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
