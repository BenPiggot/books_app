from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=1000)
    author = models.CharField(max_length=256, default="")
    description = models.TextField()
    genre = models.CharField(max_length=1000)
    image = models.URLField(default="")
    isbn = models.CharField(max_length=100)
    publication_date = models.CharField(max_length=1000, default="")
    publisher = models.CharField(max_length=256, default="")

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
