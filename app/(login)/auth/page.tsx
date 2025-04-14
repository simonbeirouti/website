import { Suspense } from 'react';
import { Login } from '../login';
import { GalleryVerticalEnd } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignInPage() {
    return (
        <Suspense>
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-sm md:max-w-md">
                            <Tabs defaultValue="signin" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                                </TabsList>
                                <TabsContent value="signin">
                                    <Login mode="signin" />
                                </TabsContent>
                                <TabsContent value="signup">
                                    <Login mode="signup" />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className="relative hidden bg-muted lg:block">
                    <img
                        src="/content/auth.jpg"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </Suspense>
    );
}
