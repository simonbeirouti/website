'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { dashboardRoutes } from '@/lib/routes'

export default function Bread() {
    const pathname = usePathname()
    
    // Function to get the title for a given path
    const getTitleForPath = (path: string) => {
        // Check in navMain first
        for (const item of dashboardRoutes.navMain) {
            if (item.url === path) return item.title
            // @ts-ignore - items might exist in future
            if (item.items) {
                // @ts-ignore - items might exist in future
                const subItem = item.items.find(sub => sub.url === path)
                if (subItem) return subItem.title
            }
        }
        
        // Check in userNav
        // const userNavItem = dashboardRoutes.userNav.find(item => item.url === path)
        // if (userNavItem) return userNavItem.title
        
        // Default to the last part of the path
        return path.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Dashboard'
    }

    // Generate breadcrumb items based on the current path
    const generateBreadcrumbs = () => {
        const paths = pathname.split('/').filter(Boolean)
        const breadcrumbs = []
        
        // Always add Dashboard as the first item
        breadcrumbs.push({
            title: 'Dashboard',
            href: '/dashboard',
            isCurrent: paths.length === 1
        })
        
        // Add remaining path segments
        let currentPath = '/dashboard'
        for (let i = 1; i < paths.length; i++) {
            currentPath += `/${paths[i]}`
            breadcrumbs.push({
                title: getTitleForPath(currentPath),
                href: currentPath,
                isCurrent: i === paths.length - 1
            })
        }
        
        return breadcrumbs
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.href} className="flex items-center">
                        {index > 0 && <BreadcrumbSeparator className="hidden md:block mr-2" />}
                        <BreadcrumbItem className="hidden md:block">
                            {crumb.isCurrent ? (
                                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={crumb.href}>
                                    {crumb.title}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
