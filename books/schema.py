from graphene_django import DjangoObjectType
import graphene

from .models import Book, Review, PurchaseVenue

class BookNode(DjangoObjectType):
    class Meta:
        model = Book

class ReviewNode(DjangoObjectType):
    class Meta:
        model = Review

class PurchaseVenueNode(DjangoObjectType):
    class Meta:
        model = PurchaseVenue

class Query(graphene.ObjectType):
    books = graphene.List(BookNode)
    reviews = graphene.List(ReviewNode)
    purchase_venues = graphene.List(PurchaseVenueNode)

    def resolve_books(self, info):
        return Book.objects.all()
    
    def resolve_reviews(self, info):
        return Review.objects.all()

    def resolve_purchase_venues(self, info):
        return PurchaseVenue.objects.all()

schema = graphene.Schema(query=Query)
