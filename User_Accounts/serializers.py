from rest_framework import serializers
from User_Accounts.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'uname', 'email', 'name']
