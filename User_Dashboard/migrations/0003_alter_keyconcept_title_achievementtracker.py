# Generated by Django 5.0.3 on 2024-03-27 09:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User_Accounts', '0003_customuser2'),
        ('User_Dashboard', '0002_alter_quiz_concept_detail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='keyconcept',
            name='title',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.CreateModel(
            name='AchievementTracker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('points', models.IntegerField(default=0, help_text='The total points the user has earned.')),
                ('coins', models.IntegerField(default=0, help_text='The total coins the user has earned.')),
                ('level', models.IntegerField(default=1, help_text="The user's current level.")),
                ('experience', models.IntegerField(default=0, help_text="The user's total experience points.")),
                ('badge', models.CharField(blank=True, help_text='The highest badge the user has earned.', max_length=100, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='achievement_tracker', to='User_Accounts.customuser')),
            ],
        ),
    ]
