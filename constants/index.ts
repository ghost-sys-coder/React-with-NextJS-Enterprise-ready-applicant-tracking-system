import {
  HomeIcon,
  UploadCloud,
  User2Icon,
  MicroscopeIcon,
  Feather,
  HandCoins,
  Contact2,
  Bot,
  BarChart3,
  Zap,
  Target,
  Smartphone,
  Shield,
} from "lucide-react";

export const navLinks = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Upload Resume", href: "/upload", icon: UploadCloud },
  { label: "Profile", href: "/profile", icon: User2Icon },
  { label: "Explore", href: "/explore", icon: MicroscopeIcon },
];

export const homepageNavLinks = [
  { label: "Features", href: "#", icon: Feather },
  { label: "Pricing", href: "#", icon: HandCoins },
  { label: "Contact", href: "#", icon: Contact2 },
];

export const stats = [
  { number: "50K+", label: "Resumes Analyzed" },
  { number: "98%", label: "Accuracy Rate" },
  { number: "24/7", label: "AI Support" },
];

export const features = [
  {
    icon: Bot,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning algorithms analyze your resume structure, content, and formatting to provide detailed insights and improvement suggestions.",
  },
  {
    icon: BarChart3,
    title: "Comprehensive Scoring",
    description:
      "Get detailed scores across multiple categories including ATS compatibility, keyword optimization, format quality, and content relevance.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Upload your resume and receive comprehensive analysis within seconds. No waiting, no delays - just immediate, actionable feedback.",
  },
  {
    icon: Target,
    title: "Industry-Specific Insights",
    description:
      "Tailored recommendations based on your target industry and role, ensuring your resume meets specific sector requirements and expectations.",
  },
  {
    icon: Smartphone,
    title: "Resume Portfolio",
    description:
      "Store, organize, and track multiple versions of your resume. Monitor improvements over time and maintain different versions for various opportunities.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your resume data is encrypted and secure. We prioritize your privacy and ensure your personal information remains confidential at all times.",
  },
];

export const pricing = [
  {
    name: "Starter",
    price: 9,
    period: "per month",
    features: [
      "5 resume analyses per month",
      "Basic AI Scoring",
      "ATS Compatibility Check",
      "Email Support",
      "Resume Storage (Up to 3)",
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: 19,
    period: "per month",
    features: [
      "12 Resume Analyses",
      "Advanced AI Insights",
      "Industry-specific recommendations",
      "Priority Support",
      "Unlimited Resume storage",
      "Export Analysis reports"
    ],
    buttonText: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: 39,
    period: "per month",
    features: [
      "Everything in Professional",
      "Unlimited Resume Analyses",
      "API Access"
    ],
    buttonText: "Contact Sales",
    popular: false
  }
];

export const footerLinks = [
  { label: "Privacy Policy", link: "/privacy-policy" },
  { label: "Terms of Service", link: "/terms" },
  { label: "Support", link: "/support" },
  { label: "About", link: "/about"}
]
