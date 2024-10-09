import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Subscription {
	id: number;
	name: string;
	url: string;
	price: number;
	icon: string;
}

interface SubscriptionStore {
	subscriptions: Subscription[];
	addSubscription: (subscription: Omit<Subscription, "id">) => void;
	removeSubscription: (id: number) => void;
	editSubscription: (id: number, updatedSubscription: Omit<Subscription, "id">) => void;
}

const defaultSubscriptions: Subscription[] = [
	{
		id: 1,
		name: "My O2",
		url: "https://www.o2online.de/ecareng/uebersicht?subscriptionId=1267960007",
		price: 52.49,
		icon: "https://www.google.com/s2/favicons?domain=.o2online.de",
	},
	{
		id: 2,
		name: "Miete",
		url: "https://www.studierendenwerk-muenchen-oberbayern.de/wohnen/mein-account/",
		price: 352.70,
		icon: "https://www.google.com/s2/favicons?domain=studierendenwerk-muenchen-oberbayern.de/wohnen/mein-account/",
	},
	{
		id: 3,
		name: "AOK",
		url: "https://meine.aok.de/",
		price: 124.00,
		icon: "https://www.google.com/s2/favicons?domain=meine.aok.de",
	},
	{
		id: 4,
		name: "Uber Eats",
		url: "https://www.ubereats.com/",
		price: 5.99,
		icon: "https://www.google.com/s2/favicons?domain=ubereats.com",
	},
	{
		id: 5,
		name: "Samsung",
		url: "https://shop.samsung.com/de/mypage/orders",
		price: 29.99,
		icon: "https://www.google.com/s2/favicons?domain=shop.samsung.com/de/mypage/orders",
	},
];

export const useSubscriptionStore = create<SubscriptionStore>()(
	persist(
		(set) => ({
			subscriptions: defaultSubscriptions,
			addSubscription: (newSubscription) =>
				set((state) => ({
					subscriptions: [
						...state.subscriptions,
						{ ...newSubscription, id: Date.now() },
					],
				})),
			removeSubscription: (id) =>
				set((state) => ({
					subscriptions: state.subscriptions.filter(
						(subscription) => subscription.id !== id,
					),
				})),
			editSubscription: (id, updatedSubscription) =>
				set((state) => ({
					subscriptions: state.subscriptions.map((subscription) =>
						subscription.id === id
							? { ...subscription, ...updatedSubscription }
							: subscription
					),
				})),
		}),
		{
			name: "subscription-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
