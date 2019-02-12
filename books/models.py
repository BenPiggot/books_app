from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Book(models.Model):
    title = models.CharField(max_length=1000)
    author_name = models.CharField(max_length=256, default="")
    description = models.TextField()
    genre = models.CharField(max_length=1000)
    image = models.URLField(default="")
    isbn = models.CharField(max_length=100)
    publication_date = models.CharField(max_length=1000, default="")
    publisher = models.CharField(max_length=256, default="")
    user = models.ForeignKey('auth.User',on_delete=models.CASCADE, null=True)

class Author(models.Model):
    name = models.CharField(max_length=256)
    nationality = models.CharField(max_length=256)
    birth_year = models.IntegerField()
    books = models.ManyToManyField(Book)

class Review(models.Model):
    author = models.CharField(max_length=256)
    source = models.CharField(max_length=256)
    link = models.URLField()
    publication_date = models.CharField(max_length=1000, default="")
    book = models.ForeignKey('Book',on_delete=models.CASCADE)

class PurchaseVenue(models.Model):
    vendor = models.CharField(max_length=1000)
    link = models.URLField()
    price = models.FloatField()
    book = models.ForeignKey('Book',on_delete=models.CASCADE)
