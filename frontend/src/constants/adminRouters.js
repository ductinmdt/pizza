import React from 'react';


export const adminRouter = [
    //dashboard
    {
        isExact: true,
        path: '/admin',
        component: React.lazy(() => import('../pages/Admins/DashBoard/DashBoard'))
    },
    //admin
    {
        isExact: true,
        path: '/admin/admins',
        component: React.lazy(() => import('../pages/Admins/UserAdmin/UserAdmin'))
    },
    {
        isExact: true,
        path: '/admin/admins/create',
        component: React.lazy(() => import('../pages/Admins/UserAdmin/CreateNewUserAdmin'))
    },
    {
        isExact: true,
        path: '/admin/admins/edit/:id',
        component: React.lazy(() => import('../pages/Admins/UserAdmin/UpdateUserAdmin'))
    },
    {
        isExact: true,
        path: '/admin/admins/detail/:id',
        component: React.lazy(() => import('../pages/Admins/UserAdmin/DetailUserAdmin'))
    },
    //User Account
    {
        isExact: true,
        path: '/admin/userUI',
        component: React.lazy(() => import('../pages/Admins/UserAccount/UserAccount'))
    },
    //Products
    {
        isExact: true,
        path: '/admin/products',
        component: React.lazy(() => import('../pages/Admins/ProductAdmins/Products'))
    },
    {
        isExact: true,
        path: '/admin/products/create',
        component: React.lazy(() => import('../pages/Admins/ProductAdmins/CreateNewProduct'))
    },
    {
        isExact: true,
        path: '/admin/products/edit/:id',
        component: React.lazy(() => import('../pages/Admins/ProductAdmins/UpdateProduct'))
    },
    {
        isExact: true,
        path: '/admin/products/detail/:id',
        component: React.lazy(() => import('../pages/Admins/ProductAdmins/DetailProduct'))
    },
    //Contacts
    {
        isExact: true,
        path: '/admin/contacts',
        component: React.lazy(() => import('../pages/Admins/ContactAdmins/Contacts'))
    },
    // {
    //     isExact: true,
    //     path: '/admin/contacts/create',
    //     component: React.lazy(() => import('../pages/Admins/ContactAdmins/CreateNewContact'))
    // },
    // {
    //     isExact: true,
    //     path: '/admin/contacts/edit/:id',
    //     component: React.lazy(() => import('../pages/Admins/ContactAdmins/UpdateContact'))
    // },
    {
        isExact: true,
        path: '/admin/contacts/detail/:id',
        component: React.lazy(() => import('../pages/Admins/ContactAdmins/DetailContact'))
    },
    //Roles
    {
        isExact: true,
        path: '/admin/roles',
        component: React.lazy(() => import('../pages/Admins/RoleAdmins/Roles'))
    },
    {
        isExact: true,
        path: '/admin/roles/create',
        component: React.lazy(() => import('../pages/Admins/RoleAdmins/CreateNewRole'))
    },
    {
        isExact: true,
        path: '/admin/roles/edit/:id',
        component: React.lazy(() => import('../pages/Admins/RoleAdmins/UpdateRole'))
    },
    {
        isExact: true,
        path: '/admin/roles/detail/:id',
        component: React.lazy(() => import('../pages/Admins/RoleAdmins/DetailRole'))
    },
    //Category
    {
        isExact: true,
        path: '/admin/categories',
        component: React.lazy(() => import('../pages/Admins/CategoryAdmin/Categories'))
    },
    {
        isExact: true,
        path: '/admin/categories/create',
        component: React.lazy(() => import('../pages/Admins/CategoryAdmin/CreateNewCategory'))
    },
    {
        isExact: true,
        path: '/admin/categories/edit/:id',
        component: React.lazy(() => import('../pages/Admins/CategoryAdmin/UpdateCategory'))
    },
    {
        isExact: true,
        path: '/admin/categories/detail/:id',
        component: React.lazy(() => import('../pages/Admins/CategoryAdmin/DetailCategory'))
    },
    //Order
    {
        isExact: true,
        path: '/admin/orders',
        component: React.lazy(() => import('../pages/Admins/Orders/Orders'))
    },
    {
        isExact: true,
        path: '/admin/orders/create',
        component: React.lazy(() => import('../pages/Admins/Orders/CreateOrder'))
    },
    {
        isExact: true,
        path: '/admin/orders/edit/:id',
        component: React.lazy(() => import('../pages/Admins/Orders/UpdateOrder'))
    },
    {
        isExact: true,
        path: '/admin/orders/detail/:id',
        component: React.lazy(() => import('../pages/Admins/Orders/DetailOrder'))
    },
    //Banner Top
    {
        isExact: true,
        path: '/admin/banners',
        component: React.lazy(() => import('../pages/Admins/BannerTop/BannerTop'))
    },
    {
        isExact: true,
        path: '/admin/banners/create',
        component: React.lazy(() => import('../pages/Admins/BannerTop/CreateBannerTop'))
    },
    {
        isExact: true,
        path: '/admin/banners/edit/:id',
        component: React.lazy(() => import('../pages/Admins/BannerTop/UpdateBannerTop'))
    },
    {
        isExact: true,
        path: '/admin/banners/detail/:id',
        component: React.lazy(() => import('../pages/Admins/BannerTop/DetailBannerTop'))
    },
    //Slider bottom
    {
        isExact: true,
        path: '/admin/sliders',
        component: React.lazy(() => import('../pages/Admins/SliderBottom/SliderBot'))
    },
    {
        isExact: true,
        path: '/admin/sliders/create',
        component: React.lazy(() => import('../pages/Admins/SliderBottom/CreateSliderBot'))
    },
    {
        isExact: true,
        path: '/admin/sliders/detail/:id',
        component: React.lazy(() => import('../pages/Admins/SliderBottom/DetailSliderBot'))
    },
    //Slider bottom
    {
        isExact: true,
        path: '/admin/comments',
        component: React.lazy(() => import('../pages/Admins/Comments/Comments'))
    },
    {
        isExact: true,
        path: '/admin/comments/detail/:id',
        component: React.lazy(() => import('../pages/Admins/Comments/Comments'))
    },
]