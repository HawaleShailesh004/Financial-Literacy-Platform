# Generated by Django 5.0.3 on 2024-04-15 16:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User_Accounts', '0004_delete_customuser2'),
        ('User_Dashboard', '0009_userprogress'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprogress',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='User_Accounts.customuser'),
        ),
    ]
