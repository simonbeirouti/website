import {
    BookOpen,
    Bot,
    BadgeCheck,
    Bell,
    CreditCard,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    Sparkles,
    SquareTerminal,
    Users,
    User,
    User2,
} from "lucide-react"

export const navRoutes = [
    { path: "about", href: "/about" },
    { path: "services", href: "/services" },
    { path: "pricing", href: "/pricing" },
    { path: "contact", href: "/contact" },
];

export const dashboardRoutes = {
    // userNav: [
    //     {
    //         title: "Activity",
    //         url: "/dashboard/activity",
    //         icon: BadgeCheck,
    //     },
    //     {
    //         title: "Settings",
    //         url: "/dashboard/settings", 
    //         icon: Settings2,
    //     },
    // ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: SquareTerminal,
            isActive: true,
            // items: [
            //     // {
            //     //     title: "Activity",
            //     //     url: "/dashboard/activity",
            //     // },
            //     // {
            //     //     title: "Settings",
            //     //     url: "/dashboard/settings",
            //     // },
            // ],
        },
    ],
    team: [
        {
            title: "Team",
            url: "/dashboard/team",
            icon: Frame,
            // items: [
            //     {
            //         title: "List",
            //         url: "/dashboard/team/list",
            //     },
            //     {
            //         title: "Settings",
            //         url: "/dashboard/team/settings",
            //     },
            // ],
        },
        {
            title: "Team List",
            url: "/dashboard/team/list",
            icon: User2,
        },
        {
            title: "Settings",
            url: "/dashboard/team/settings",
            icon: Settings2,
        },
    ],
    profile: [
        {
            title: "Profile",
            url: "/dashboard/profile",
            icon: User,
        },
        {
            title: "Activity",
            url: "/dashboard/profile/activity",
            icon: BadgeCheck,
        },
        {
            title: "Settings",
            url: "/dashboard/profile/settings",
            icon: Settings2,
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
}