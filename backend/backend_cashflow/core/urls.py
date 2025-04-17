

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagViewSet, TransactionViewSet, balance_summary

router = DefaultRouter()
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'transactions', TransactionViewSet, basename='transaction')

urlpatterns = [
    path('', include(router.urls)),
     path('summary/', balance_summary, name='balance-summary'),
    

]
