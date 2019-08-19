# Generated by Django 2.2.2 on 2019-06-25 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ClientFeedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=55)),
                ('tellView', models.CharField(max_length=55)),
                ('email', models.EmailField(blank=True, max_length=55)),
                ('message', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ClientFeedback2',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=50)),
                ('customer_email', models.EmailField(max_length=254)),
            ],
        ),
    ]
