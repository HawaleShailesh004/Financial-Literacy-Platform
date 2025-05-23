# Generated by Django 5.0.3 on 2024-03-27 10:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User_Accounts', '0004_delete_customuser2'),
        ('User_Dashboard', '0005_alter_keyconcept_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserCurrentProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current_chapter', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users_current_chapter', to='User_Dashboard.chapter')),
                ('current_concept', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users_current_concept', to='User_Dashboard.keyconcept')),
                ('current_module', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users_current_module', to='User_Dashboard.module')),
                ('current_quiz', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users_current_quiz', to='User_Dashboard.quiz')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='current_progress', to='User_Accounts.customuser')),
            ],
        ),
    ]
