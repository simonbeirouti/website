import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricing } from "@/data/pricing";
import { PricingCard } from "./pricing-card";

interface Package {
    name: string;
    priceRange: string;
    description: string;
    features: string[];
    interval?: string;
}

interface Service {
    name: string;
    description: string;
    packages: Package[];
}

interface StripePrice {
    id: string;
    productId: string;
    unitAmount: number | null;
    currency: string;
    interval?: string;
}

interface StripeProduct {
    id: string;
    name: string;
    description: string | null;
    defaultPriceId?: string;
}

interface PricingDisplayProps {
    stripePrices: StripePrice[];
    stripeProducts: StripeProduct[];
}

export default function PricingDisplay({ stripePrices, stripeProducts }: PricingDisplayProps) {
    const mainServices = Object.entries(pricing.pricingStructures).filter(
        ([key]) => key !== 'alternativePricing'
    ) as [string, Service][];

    const subscriptionTiers = pricing.pricingStructures.alternativePricing.subscriptionModel.tiers;

    // Helper function to find Stripe price for a product
    const findStripePrice = (productName: string, prices: StripePrice[], interval?: string) => {
        // Normalize product names for comparison
        const normalizedProductName = productName.toLowerCase().replace(/ tier$/, '');
        const product = stripeProducts.find(p => 
            p.name.toLowerCase().includes(normalizedProductName) || 
            normalizedProductName.includes(p.name.toLowerCase())
        );
        
        if (!product) {
            console.warn(`No Stripe product found for: ${productName}`);
            return null;
        }
        
        // For subscription tiers, match by interval
        if (interval) {
            return prices.find(p => 
                p.productId === product.id && 
                p.interval === interval
            );
        }
        
        // For one-time purchases, find the first matching price
        return prices.find(p => p.productId === product.id);
    };

    return (
        <div className="container mx-auto py-12">
            <Tabs defaultValue="websiteDevelopment" className="w-full">
                <TabsList className="grid w-2/3 mx-auto grid-cols-4">
                    <TabsTrigger value="websiteDevelopment">Website</TabsTrigger>
                    <TabsTrigger value="web3Services">Web3</TabsTrigger>
                    <TabsTrigger value="aiDevelopment">AI</TabsTrigger>
                    <TabsTrigger value="designBranding">Design</TabsTrigger>
                </TabsList>

                {mainServices.map(([key, service]) => (
                    <TabsContent key={key} value={key}>
                        <div className="space-y-4 p-4">
                            <div className="text-center mb-12 lg:mb-20 mt-6">
                                <h2 className="text-3xl font-bold">{service.name}</h2>
                                <p className="text-muted-foreground mt-2">{service.description}</p>
                            </div>
                            <div className="grid lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
                                {service.packages.map((pkg: Package, index: number) => {
                                    const stripePrice = findStripePrice(pkg.name, stripePrices, pkg.interval);
                                    return (
                                        <PricingCard
                                            key={pkg.name}
                                            title={pkg.name}
                                            price={stripePrice ? `$${stripePrice.unitAmount ? stripePrice.unitAmount / 100 : 0}` : pkg.priceRange}
                                            description={pkg.description}
                                            features={pkg.features}
                                            isPopular={index === 1}
                                            isPrimary={index === 1}
                                            isEnterprise={index === 2}
                                            priceId={stripePrice?.id}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            <Tabs defaultValue="monthly" className="w-full mt-32">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold">Subscription Pricing</h2>
                    <p className="text-muted-foreground">Short-term and consistent option for your business</p>
                </div>
                <div className="relative w-[300px] mx-auto z-10 mb-16 mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="monthly" className="relative px-8">
                            Monthly
                        </TabsTrigger>
                        <TabsTrigger value="yearly" className="relative px-8">
                            Yearly
                            <span className="z-0 absolute -top-5 left-2/3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full whitespace-nowrap rotate-15">
                                2 months free
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="monthly" className="mt-4 p-4">
                    <div className="grid lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
                        {subscriptionTiers.map((tier) => {
                            const stripePrice = findStripePrice(tier.name, stripePrices, 'month');
                            return (
                                <PricingCard
                                    key={tier.name}
                                    title={tier.name.replace(" Tier", "")}
                                    price={stripePrice ? `$${stripePrice.unitAmount ? stripePrice.unitAmount / 100 : 0}` : tier.monthlyPrice.split("/")[0]}
                                    priceSubtext="/ month"
                                    description={tier.description}
                                    features={tier.features}
                                    isPopular={tier.name === "Growth Tier"}
                                    isPrimary={tier.name === "Growth Tier"}
                                    isEnterprise={tier.name.toLowerCase().includes('enterprise')}
                                    priceId={stripePrice?.id}
                                />
                            );
                        })}
                    </div>
                </TabsContent>

                <TabsContent value="yearly" className="mt-4 p-4">
                    <div className="grid lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
                        {subscriptionTiers.map((tier) => {
                            const stripePrice = findStripePrice(tier.name, stripePrices, 'year');
                            return (
                                <PricingCard
                                    key={tier.name}
                                    title={tier.name.replace(" Tier", "")}
                                    price={stripePrice ? `$${stripePrice.unitAmount ? stripePrice.unitAmount / 100 : 0}` : tier.yearlyPrice.split("/")[0]}
                                    priceSubtext="/ year"
                                    description={tier.description}
                                    features={tier.features}
                                    isPopular={tier.name === "Growth Tier"}
                                    isPrimary={tier.name === "Growth Tier"}
                                    isEnterprise={tier.name.toLowerCase().includes('enterprise')}
                                    priceId={stripePrice?.id}
                                />
                            );
                        })}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}