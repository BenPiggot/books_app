import books.schema
import graphene

from graphene_django.debug import DjangoDebug

class Query(books.schema.Query,
            graphene.ObjectType):
  debug = graphene.Field(DjangoDebug, name='__debug')

class Mutation(books.schema.Mutation,
              graphene.ObjectType):
  pass

schema = graphene.Schema(query=Query, mutation=Mutation)