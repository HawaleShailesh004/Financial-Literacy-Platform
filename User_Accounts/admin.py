from django.contrib import admin
from User_Accounts.models import CustomUser
# Register your models here.
admin.site.register(CustomUser)
admin.site.site_header = "Financial Literacy Platform - Admin Panel"
admin.site.site_title = "FLC admin Panel"



