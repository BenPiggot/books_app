# Generated by Django 2.1.5 on 2019-01-15 04:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0007_auto_20190113_0634'),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('nationality', models.CharField(max_length=256)),
                ('birth_year', models.IntegerField()),
            ],
        ),
        migrations.RenameField(
            model_name='book',
            old_name='author',
            new_name='author_name',
        ),
        migrations.AddField(
            model_name='author',
            name='books',
            field=models.ManyToManyField(to='books.Book'),
        ),
    ]
