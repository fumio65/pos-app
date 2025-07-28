from django.urls import path
from .views import ProductListView, OrderCreateView

urlpatterns = [
    path('products/', ProductListView.as_view()),
    path('orders/', OrderCreateView.as_view()),
]
