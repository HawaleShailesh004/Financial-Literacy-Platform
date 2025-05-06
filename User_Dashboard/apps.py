from django.apps import AppConfig



class UserDashboardConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'User_Dashboard'

    def ready(self):
        import User_Dashboard.signals 