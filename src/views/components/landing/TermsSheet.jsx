"use client";
import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/views/components/ui/sheet";
import { cn } from "@/models/lib/utils";

const DocumentIcon = ({ className, ...props }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M1 6.6C1 3.9603 1 2.6401 1.91156 1.8204C2.82311 1.0007 4.28922 1 7.22222 1H8.77778C11.7108 1 13.1777 1 14.0884 1.8204C14.9992 2.6408 15 3.9603 15 6.6V9.4C15 12.0397 15 13.3599 14.0884 14.1796C13.1769 14.9993 11.7108 15 8.77778 15H7.22222C4.28922 15 2.82233 15 1.91156 14.1796C1.00078 13.3592 1 12.0397 1 9.4V6.6Z"
      stroke="currentColor"
    />
    <path
      d="M4.89062 6.60059H11.1128M4.89062 9.40059H8.77951"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

const linkifyText = (text) => {
  if (!text) return null;
  const parts = text.split(/(hello@1atives\.com)/g);
  return parts.map((part, i) =>
    part === "hello@1atives.com" ? (
      <a
        key={i}
        href="mailto:hello@1atives.com"
        className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const TermsListItems = ({ items, showLetters = true }) => {
  if (!items?.length) return null;
  return (
    <ul className="space-y-2.5 sm:space-y-3">
      {items.map((item, itemIndex) => (
        <li
          key={itemIndex}
          className="flex gap-2.5 text-[13px] sm:text-sm leading-relaxed text-white/75"
        >
          {showLetters && items.length > 1 && (
            <span className="mt-0.5 w-4 shrink-0 text-[11px] font-semibold text-white/40">
              {String.fromCharCode(97 + itemIndex)}.
            </span>
          )}
          <span className="min-w-0 flex-1">
            {item.label ? (
              <>
                <span className="font-medium text-white/90">{item.label}: </span>
                <span className="whitespace-pre-line">{linkifyText(item.text)}</span>
              </>
            ) : (
              <span className="whitespace-pre-line">{linkifyText(item.text)}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};

const TermsSubsections = ({ subsections }) => {
  if (!subsections?.length) return null;
  return (
    <div className="mt-4 space-y-4">
      {subsections.map((sub, subIndex) => (
        <div
          key={subIndex}
          className="border-l-2 border-blue-500/30 pl-3 sm:pl-4"
        >
          {sub.subtitle && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-[13px]">
              {sub.subtitle}
            </p>
          )}
          <TermsListItems items={sub.items} />
        </div>
      ))}
    </div>
  );
};

const TermsSection = ({ section, index }) => {
  const showNumber = !section.noNumbering;
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-sm transition-colors sm:p-5">
      <h3 className="mb-3 flex items-start gap-2.5 text-sm font-semibold text-white sm:text-base">
        {showNumber && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white/15 to-white/5 text-xs font-bold text-white/80 ring-1 ring-white/10">
            {index + 1}
          </span>
        )}
        <span className="min-w-0 flex-1 pt-0.5 leading-snug">{section.title}</span>
      </h3>
      {section.subtitle && (
        <p className="-mt-1 mb-3 text-xs leading-relaxed text-white/60 sm:text-[13px]">
          {section.subtitle}
        </p>
      )}
      <TermsListItems
        items={section.items}
        showLetters={section.items?.length > 1}
      />
      <TermsSubsections subsections={section.subsections} />
      {section.footer && (
        <p className="mt-4 border-t border-white/[0.06] pt-3 text-xs italic leading-relaxed text-white/50">
          {section.footer}
        </p>
      )}
    </article>
  );
};

const CategoryTabs = ({ activeOption, onOptionChange, options }) => (
  <div className="relative -mx-1 shrink-0">
    <div
      className="flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory touch-pan-x"
      role="tablist"
      aria-label="Legal document categories"
    >
      {options.map((option) => {
        const isActive = activeOption === option;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onOptionChange(option)}
            className={cn(
              "snap-start shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-semibold transition-all duration-200 sm:px-4 sm:py-2.5 sm:text-xs",
              isActive
                ? "border-white/25 bg-white/15 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                : "border-transparent bg-white/[0.03] text-white/55 hover:bg-white/[0.08] hover:text-white/85"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
    <div
      className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#05050A] to-transparent sm:from-[#0a0f1f]"
      aria-hidden
    />
    <div
      className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#05050A] to-transparent sm:from-[#0a0f1f]"
      aria-hidden
    />
  </div>
);

const categoryList = [
  "Privacy Policy",
  "Terms of Service",
  "Guidelines",
  "Affiliate Terms",
  "Membership Terms",
  "Prosite Terms",
  "Other",
];

const termsContent = {
  "Privacy Policy": {
    intro:
      "This Privacy Policy explains how ATIVES WORLD (OPC) PVT LTD ('Company', 'we', 'our', 'us') collects, uses, shares, and safeguards information when you access or use Atives (the 'Platform').\n\nAtives is a platform that enables creative professionals to showcase their work, build portfolios, connect with peers, and access professional opportunities. By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.",
    sections: [
      {
        title: "Information We Collect",
        subtitle:
          "We collect different categories of information to operate our Platform effectively:",
        items: [
          {
            label: "Account Information",
            text: "Your name, email address, mobile number, password, professional details, and profile information you provide during registration.",
          },
          {
            label: "Payment Information",
            text: "Billing address, payment method, and related details processed through secure payment partners. We do not store full credit/debit card or banking details.",
          },
          {
            label: "Usage Data",
            text: "Log data such as device information, IP address, operating system, browser type, date and time of access, clickstream data, and activity on the Platform.",
          },
          {
            label: "Content Data",
            text: "Portfolios, creative work, photographs, videos, posts, comments, and any other content you upload or share.",
          },
          {
            label: "Communication Data",
            text: "Messages, interactions, and correspondence with us or other users.",
          },
          {
            label: "Cookies and Tracking Technologies",
            text: "Small files stored on your device to enhance user experience, track analytics, and support personalized features.",
          },
        ],
      },
      {
        title: "How We Use Your Information",
        subtitle: "Your information is used to:",
        items: [
          {
            text: "Provide, operate, and maintain the Platform and its features.",
          },
          {
            text: "Authenticate you as a registered user and secure your account.",
          },
          { text: "Process payments, verify transactions, and prevent fraud." },
          {
            text: "Enable professional networking and discovery of creative work.",
          },
          { text: "Improve user experience, design, and content relevance." },
          { text: "Provide customer support and respond to inquiries." },
          {
            text: "Send administrative updates, promotional content, and service announcements (with opt-out options).",
          },
          {
            text: "Comply with applicable Indian and international laws, tax requirements, and regulatory obligations.",
          },
        ],
      },
      {
        title: "Sharing of Information",
        subtitle: "We may share your information in the following ways:",
        items: [
          {
            label: "With Other Users",
            text: "Your profile, portfolio, and uploaded creative content may be visible to other users as part of the Platform's purpose.",
          },
          {
            label: "With Service Providers",
            text: "We may share data with vendors providing hosting, analytics, payment processing, cloud storage, or marketing services.",
          },
          {
            label: "With Legal or Government Authorities",
            text: "Where required by applicable law, court order, or regulatory obligation.",
          },
          {
            label: "In Business Transactions",
            text: "In case of a merger, acquisition, restructuring, or sale of assets, your data may be transferred as part of the business assets.",
          },
        ],
        footer: "We do not sell personal data to third parties.",
      },
      {
        title: "Data Retention",
        items: [
          {
            text: "We retain your personal information as long as your account is active, or as necessary to provide services, resolve disputes, enforce agreements, or comply with legal obligations. On request, we may delete or anonymize data, subject to our legal and compliance requirements.",
          },
        ],
      },
      {
        title: "Your Rights",
        subtitle: "Depending on your jurisdiction, you may have the right to:",
        items: [
          { text: "Access, review, or update your personal information." },
          { text: "Request correction of inaccurate data." },
          { text: "Request deletion of your account and associated data." },
          { text: "Restrict or object to the processing of certain data." },
          {
            text: "Withdraw consent to optional data processing (such as marketing).",
          },
          {
            text: "Request a copy of your data in a portable format where applicable.",
          },
        ],
        footer:
          "To exercise these rights, contact us at hello@1atives.com. We may require verification of your identity before processing such requests.",
      },
      {
        title: "Security Measures",
        items: [
          {
            text: "We implement administrative, technical, and physical safeguards to protect your personal data against unauthorized access, disclosure, alteration, or destruction. These include encryption, firewalls, role-based access controls, and secure data storage practices. However, no system can be guaranteed 100% secure. Users are advised to maintain strong passwords and safeguard login credentials.",
          },
        ],
      },
      {
        title: "Children's Privacy",
        items: [
          {
            text: "The Platform is not intended for individuals under the age of 13 (or the minimum legal age in your jurisdiction). We do not knowingly collect data from children. If we become aware that personal information of a child has been collected without parental consent, we will delete it.",
          },
        ],
      },
      {
        title: "International Data Transfer",
        items: [
          {
            text: "Your information may be stored and processed in India and other countries where we or our service providers operate. By using the Platform, you consent to the transfer of your data across borders, subject to applicable laws.",
          },
        ],
      },
      {
        title: "Cookies and Tracking",
        items: [
          {
            text: "We use cookies and similar technologies to provide a personalized experience, analyze traffic, and deliver relevant content. Users can manage cookie preferences through their browser settings, though disabling cookies may affect Platform functionality.",
          },
        ],
      },
      {
        title: "Changes to this Policy",
        items: [
          {
            text: "We may update this Privacy Policy periodically to reflect legal, regulatory, or operational changes. The updated version will be published on the Platform with a new 'Last Updated' date. Continued use of the Platform indicates your acceptance of the revised policy.",
          },
        ],
      },
      {
        title: "Contact Us",
        subtitle:
          "For any questions, concerns, or complaints about this Privacy Policy or our data practices, please contact:",
        items: [
          {
            text: "ATIVES WORLD (OPC) PVT LTD\nPlatform: Atives\nEmail: hello@1atives.com\nAddress: #20, Commercial Complex, Nehru Nagar East, Bhilai, C.G, India 490020",
          },
        ],
      },
    ],
  },
  "Terms of Service": {
    intro:
      "These Terms of Service ('Terms') govern your use of the platform Atives, operated by ATIVES WORLD (OPC) PVT LTD ('Company', 'we', 'our', 'us'). By accessing or using Atives (the 'Platform'), you agree to comply with and be bound by these Terms. If you do not agree, you should not use the Platform.",
    sections: [
      {
        title: "Eligibility",
        noNumbering: true,
        items: [
          {
            text: "You must be at least 18 years old or the age of majority in your jurisdiction to use the Platform.",
          },
          {
            text: "By registering, you represent and warrant that the information provided is accurate, complete, and up to date.",
          },
          {
            text: "Use of the Platform is prohibited where restricted by law.",
          },
        ],
      },
      {
        title: "User Accounts",
        noNumbering: true,
        items: [
          {
            text: "You must create an account to access certain features of Atives.",
          },
          {
            text: "You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.",
          },
          {
            text: "You must promptly notify us at hello@1atives.com of any unauthorized use of your account.",
          },
        ],
      },
      {
        title: "Services Provided",
        noNumbering: true,
        items: [
          {
            text: "Atives is a platform designed to enable creative professionals to showcase portfolios, network, and access professional opportunities.",
          },
          {
            text: "We may add, modify, suspend, or discontinue services at any time without prior notice.",
          },
          {
            text: "Certain features or services may require a paid subscription.",
          },
        ],
      },
      {
        title: "User Content",
        noNumbering: true,
        items: [
          {
            text: "You retain ownership of the creative work, portfolios, posts, and other content you upload ('User Content').",
          },
          {
            text: "By uploading User Content, you grant the Company a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute such content for the purpose of operating and promoting the Platform.",
          },
          {
            text: "You represent that you have the necessary rights to upload and share User Content and that it does not violate third-party rights or applicable laws.",
          },
          {
            text: "We reserve the right to remove content that is unlawful, harmful, offensive, or violates these Terms.",
          },
        ],
      },
      {
        title: "Prohibited Conduct",
        noNumbering: true,
        subtitle: "You agree not to:",
        items: [
          {
            text: "Use the Platform for unlawful purposes or to promote illegal activity.",
          },
          {
            text: "Infringe the intellectual property or privacy rights of others.",
          },
          {
            text: "Upload harmful, defamatory, obscene, or misleading content.",
          },
          {
            text: "Attempt to hack, disrupt, or interfere with Platform functionality.",
          },
          {
            text: "Engage in spamming, phishing, or unauthorized data collection.",
          },
        ],
      },
      {
        title: "Subscriptions and Payments",
        noNumbering: true,
        items: [
          { text: "Certain services may require payment of fees." },
          {
            text: "Prices, payment terms, and billing cycles will be specified at the time of subscription.",
          },
          {
            text: "Payments are processed by third-party payment processors. We do not store complete payment card or bank details.",
          },
          {
            text: "Subscription fees are generally non-refundable unless required by applicable law.",
          },
        ],
      },
      {
        title: "Intellectual Property",
        noNumbering: true,
        items: [
          {
            text: "The Platform, including its design, software, logos, and trademarks, is the property of ATIVES WORLD (OPC) PVT LTD and protected under intellectual property laws.",
          },
          {
            text: "You may not copy, modify, distribute, sell, or exploit any part of the Platform without prior written consent.",
          },
        ],
      },
      {
        title: "Third-Party Services",
        noNumbering: true,
        items: [
          {
            text: "The Platform may contain links to third-party websites, services, or resources. We are not responsible for the availability, accuracy, or content of such external sites or services.",
          },
        ],
      },
      {
        title: "Termination",
        noNumbering: true,
        items: [
          {
            text: "We may suspend or terminate your access to the Platform at any time if you violate these Terms or applicable laws.",
          },
          {
            text: "You may terminate your account at any time by contacting us at hello@1atives.com.",
          },
          {
            text: "Termination does not affect rights or obligations accrued prior to termination.",
          },
        ],
      },
      {
        title: "Disclaimers",
        noNumbering: true,
        items: [
          {
            text: "The Platform is provided on an 'as is' and 'as available' basis without warranties of any kind.",
          },
          {
            text: "We do not guarantee uninterrupted or error-free operation, or that the Platform will meet your expectations.",
          },
          {
            text: "The Company disclaims all liability for damages arising from your use of or inability to use the Platform.",
          },
        ],
      },
      {
        title: "Limitation of Liability",
        noNumbering: true,
        items: [
          {
            text: "To the maximum extent permitted by law, ATIVES WORLD (OPC) PVT LTD shall not be liable for indirect, incidental, consequential, or punitive damages, including loss of profits, data, or goodwill, even if advised of such damages.",
          },
        ],
      },
      {
        title: "Indemnification",
        noNumbering: true,
        items: [
          {
            text: "You agree to indemnify and hold harmless ATIVES WORLD (OPC) PVT LTD, its directors, employees, and affiliates from any claims, liabilities, or damages arising out of your use of the Platform, your User Content, or your violation of these Terms.",
          },
        ],
      },
      {
        title: "Governing Law and Dispute Resolution",
        noNumbering: true,
        items: [
          { text: "These Terms are governed by the laws of India." },
          {
            text: "Any disputes shall be subject to the exclusive jurisdiction of the courts in Bhilai, Chhattisgarh, India.",
          },
          {
            text: "We encourage resolving disputes amicably before pursuing legal remedies.",
          },
        ],
      },
      {
        title: "Changes to the Terms",
        noNumbering: true,
        items: [
          {
            text: "We may revise these Terms from time to time. The revised version will be posted with an updated 'Last Updated' date. Continued use of the Platform constitutes acceptance of the revised Terms.",
          },
        ],
      },
      {
        title: "Contact Information",
        noNumbering: true,
        subtitle:
          "For questions or concerns regarding these Terms, please contact:",
        items: [
          {
            text: "ATIVES WORLD (OPC) PVT LTD\nPlatform: Atives\nEmail: hello@1atives.com\nAddress: #20, Commercial Complex, Nehru Nagar East, Bhilai, C.G, India 490020",
          },
        ],
      },
    ],
  },
  Guidelines: {
    intro:
      "Welcome to Atives — a platform where people, professionals, businesses, institutes, and communities connect, collaborate, and grow together. To keep Atives safe, respectful, and meaningful for everyone, we ask all members to follow these guidelines.\n\nThese guidelines apply to all users, including individual professionals, businesses, institutes, and communities.",
    sections: [
      {
        title: "Respect and Professionalism",
        items: [
          {
            text: "Treat everyone with respect — whether they are individuals, businesses, or communities.",
          },
          {
            text: "Maintain professionalism in all interactions, including posts, messages, and comments.",
          },
          {
            text: "No hate speech, harassment, bullying, or discrimination of any kind.",
          },
        ],
      },
      {
        title: "Authenticity and Integrity",
        items: [
          {
            text: "Use your real identity for personal or professional profiles.",
          },
          {
            text: "Businesses, institutes, and communities must provide accurate and verifiable details about their entity.",
          },
          {
            text: "Do not impersonate others or misrepresent your background, skills, or organization.",
          },
          {
            text: "Share only authentic, original, or properly credited content.",
          },
        ],
      },
      {
        title: "Content Standards",
        items: [
          { text: "Share meaningful, constructive, and professional content." },
          {
            text: "Avoid spam, repetitive promotions, clickbait, or irrelevant content.",
          },
          {
            text: "Prohibited: explicit content, violent media, misleading claims, or unverified financial/medical advice.",
          },
          {
            text: "Posts should add value to the community — whether informative, creative, or inspiring.",
          },
        ],
      },
      {
        title: "Networking and Collaboration",
        items: [
          { text: "Build genuine connections, not just for sales or spam." },
          {
            text: "Cold-pitching is allowed only when done respectfully and relevantly.",
          },
          {
            text: "Respect boundaries — if someone is not interested, do not repeatedly contact them.",
          },
          { text: "Encourage collaboration, mentorship, and growth." },
        ],
      },
      {
        title: "Business, Institute & Community Conduct",
        items: [
          {
            text: "Businesses: showcase services, products, or catalogs transparently and ethically.",
          },
          {
            text: "Institutes: share authentic programs, courses, or opportunities.",
          },
          {
            text: "Communities: foster inclusive, safe spaces for knowledge sharing and engagement.",
          },
          {
            text: "Do not post misleading job offers, scams, or false opportunities.",
          },
        ],
      },
      {
        title: "Safety and Security",
        items: [
          { text: "Do not share personal or sensitive data publicly." },
          { text: "Protect your account with strong authentication." },
          {
            text: "Report suspicious users, fraudulent activity, or security issues immediately.",
          },
          {
            text: "Atives reserves the right to suspend or remove accounts violating safety protocols.",
          },
        ],
      },
      {
        title: "Intellectual Property",
        items: [
          { text: "Respect copyrights, trademarks, and ownership rights." },
          { text: "Share only content you own or have the right to use." },
          {
            text: "Give proper credit to creators, professionals, or businesses when referencing their work.",
          },
        ],
      },
      {
        title: "Fair Use of Platform Features",
        items: [
          {
            text: "Use features like Prosite, Catalogs, Communities, and Networking tools responsibly.",
          },
          {
            text: "Do not exploit platform rewards, affiliate programs, or engagement features with fake accounts or bots.",
          },
          {
            text: "Avoid manipulating algorithms with fake likes, comments, or follows.",
          },
        ],
      },
      {
        title: "Inclusivity and Diversity",
        items: [
          {
            text: "Atives welcomes all — across professions, industries, geographies, and communities.",
          },
          {
            text: "Encourage healthy discussions and celebrate diversity of thought and culture.",
          },
          {
            text: "No exclusion, gatekeeping, or bias against newcomers or underrepresented groups.",
          },
        ],
      },
      {
        title: "Enforcement and Consequences",
        items: [
          {
            text: "Violating these guidelines may result in warnings, feature restrictions, account suspension, or permanent removal.",
          },
          {
            text: "Atives reserves the right to review, flag, or take down any content or profile that violates these rules.",
          },
          {
            text: "Severe or repeated violations will be reported to legal authorities if necessary.",
          },
        ],
      },
      {
        title: "Reporting and Support",
        items: [
          {
            text: "If you see a violation, use the Report feature or contact our support team.",
          },
          { text: "For escalations, email us at hello@1atives.com." },
          {
            text: "Our team actively reviews reports to keep Atives safe for all.",
          },
        ],
      },
    ],
  },
  "Affiliate Terms": {
    intro:
      "Welcome to the Atives Affiliate Program. These Terms and Conditions ('Terms') govern your participation in the affiliate program ('Program') offered by ATIVES WORLD (OPC) PVT LTD ('Atives,' 'we,' 'us,' or 'our'). By joining and participating in the Program, you agree to these Terms. If you do not agree, please do not participate.",
    sections: [
      {
        title: "Overview",
        items: [
          {
            text: "The Atives Affiliate Program allows registered members and partners to earn commissions by promoting Atives and referring new users to our platform. Affiliates ('Atives Affiliate Partners' or 'you') receive a unique referral link to track referrals, commissions, and rewards.",
          },
          {
            text: "The Program is designed to incentivize ethical promotion of the Platform across all user segments, including individuals, professionals, businesses, institutes, and communities.",
          },
        ],
      },
      {
        title: "Eligibility",
        subtitle: "To participate, you must:",
        items: [
          { text: "Be at least 18 years old." },
          { text: "Be an active member or partner on Atives." },
          {
            text: "Own or have access to a valid website, blog, social media account, or other online presence for promotion.",
          },
          {
            text: "Not be an employee, contractor, or direct family member of any employee of Atives.",
          },
          {
            text: "Comply with all local and international laws relevant to your activities under this Program.",
          },
        ],
      },
      {
        title: "Enrollment",
        subtitle: "To join the Program:",
        items: [
          {
            text: "Complete and submit the affiliate application form on our website.",
          },
          {
            text: "Receive written acceptance from Atives. Approval is at our sole discretion.",
          },
          {
            text: "Provide valid government-issued identification for verification upon request.",
          },
          {
            text: "Agree to maintain accurate contact and banking/payment information.",
          },
        ],
      },
      {
        title: "Affiliate Responsibilities",
        subtitle: "As an Atives Affiliate Partner, you agree to:",
        items: [
          { text: "Promote Atives professionally, ethically, and truthfully." },
          {
            text: "Use only approved marketing materials provided by Atives unless prior written approval is obtained.",
          },
          { text: "Not misrepresent Atives, our products, or services." },
          {
            text: "Ensure referral links are correctly formatted for accurate tracking.",
          },
          {
            text: "Comply with all applicable laws, including advertising, privacy, and data protection regulations.",
          },
          {
            text: "Not engage in fraudulent, deceptive, or manipulative practices, including creating fake accounts, misreporting sales, or inflating activity metrics.",
          },
        ],
      },
      {
        title: "Referral Tracking and Commission",
        subsections: [
          {
            subtitle: "Tracking",
            items: [
              {
                text: "Unique referral links track your referrals, sales, and earnings. Only sales completed through your valid link are eligible for commission.",
              },
              {
                text: "We are not responsible for referrals or sales that cannot be tracked due to incorrect link usage or technical errors beyond our control.",
              },
            ],
          },
          {
            subtitle: "Commission Structure",
            items: [
              {
                text: "Commission rates, qualifying criteria, and eligible products are defined on the Program page.",
              },
              {
                text: "Commissions are earned only after the referred user: Registers on Atives, and Purchases a membership or subscription, and Completes profile/prosite creation, which is reviewed and approved by Atives.",
              },
            ],
          },
          {
            subtitle: "Payouts",
            items: [
              {
                text: "Frequency: Payouts may be instant, weekly, bi-weekly, monthly, or target-based, as specified in Program details.",
              },
              {
                text: "Minimum Payout Balance: Earnings must meet the threshold to qualify for payout.",
              },
              {
                text: "Maximum Payout: Limits may apply per month or per transaction.",
              },
              {
                text: "Mode of Payment: Direct bank transfer, digital wallet, or pay link, depending on availability.",
              },
              {
                text: "Adjustments: Commissions are calculated after applicable taxes, discounts, refunds, or cancellations.",
              },
              {
                text: "Changes: Atives may update payout rules, thresholds, or modes; notice will be provided on the affiliate dashboard or via email.",
              },
            ],
          },
          {
            subtitle: "Taxes and Compliance",
            items: [
              {
                text: "Affiliates are responsible for reporting and paying applicable taxes on earnings, including income tax, GST, or international tax obligations.",
              },
              {
                text: "Atives may withhold applicable taxes as required by law.",
              },
            ],
          },
        ],
      },
      {
        title: "Marketing and Promotion",
        items: [
          {
            text: "Only approved materials may be used for promotion. Written approval is required for other content.",
          },
        ],
        subsections: [
          {
            subtitle: "Prohibited activities include:",
            items: [
              {
                text: "Spamming, unsolicited messaging, email blasts, or illegal advertising.",
              },
              {
                text: "Using fake accounts, fraudulent data, or bots to generate referrals.",
              },
              {
                text: "Misleading or deceptive promotions, claims, or pricing.",
              },
              {
                text: "Violating intellectual property or privacy rights of third parties.",
              },
            ],
          },
        ],
      },
      {
        title: "Termination",
        subsections: [
          {
            subtitle: "By Affiliate",
            items: [
              {
                text: "You may terminate participation at any time by providing written notice.",
              },
            ],
          },
          {
            subtitle: "By Atives",
            items: [
              {
                text: "Atives may terminate or suspend participation with or without cause. Grounds include: Violation of these Terms, Community Guidelines, or applicable law; Fraudulent or unethical conduct; Activities causing reputational or financial harm to Atives.",
              },
              {
                text: "Termination may result in forfeiture of pending commissions or rewards, at Atives' discretion.",
              },
            ],
          },
        ],
      },
      {
        title: "Limitation of Liability",
        items: [
          { text: "The Program is provided 'as is' without warranties." },
          {
            text: "Atives shall not be liable for indirect, incidental, consequential, or punitive damages.",
          },
          {
            text: "Our liability is limited to the total commissions earned and payable under these Terms.",
          },
        ],
      },
      {
        title: "Intellectual Property",
        items: [
          {
            text: "All trademarks, logos, brand materials, and Platform content remain the property of Atives.",
          },
          {
            text: "Affiliates may not use Atives' intellectual property outside the Program or marketing materials without written consent.",
          },
        ],
      },
      {
        title: "Confidentiality",
        items: [
          {
            text: "Affiliate data, sales metrics, and Program details are confidential.",
          },
          {
            text: "Affiliates shall not share confidential information with third parties without prior consent.",
          },
        ],
      },
      {
        title: "Modifications",
        items: [
          {
            text: "Atives may modify Program Terms, commission rates, payout rules, or eligibility criteria at any time.",
          },
          {
            text: "Updated terms are posted on the affiliate dashboard and take effect immediately. Continued participation constitutes acceptance.",
          },
        ],
      },
      {
        title: "Governing Law and Jurisdiction",
        items: [
          { text: "These Terms are governed by the laws of India." },
          {
            text: "Disputes will be subject to the jurisdiction of competent courts in Bhilai, Chhattisgarh, India.",
          },
        ],
      },
      {
        title: "Contact",
        subtitle: "For questions or clarifications regarding the Program:",
        items: [
          { text: "ATIVES WORLD (OPC) PVT LTD\nEmail: hello@1atives.com" },
        ],
      },
    ],
  },
  "Membership Terms": {
    intro:
      "These Membership Terms ('Terms') govern all membership plans offered by Atives, a platform owned and operated by ATIVES WORLD (OPC) PVT LTD ('Company,' 'we,' 'us,' 'our'). Membership is available to individuals, professionals, businesses, institutes, communities, and any other user categories that may be introduced in the future.\n\nBy subscribing to any membership plan (lifetime, recurring, or otherwise), you ('Member,' 'you,' 'your') agree to be bound by these Terms, along with our Terms of Service, Privacy Policy, and Community Guidelines.",
    sections: [
      {
        title: "Membership Types",
        items: [
          {
            text: "Lifetime Start Membership: One-time payment granting long-term or permanent access to benefits listed at the time of purchase.",
          },
          {
            text: "Recurring Membership: Subscription-based access (monthly, quarterly, annually, or as specified). Auto-renewals apply unless cancelled before the billing date.",
          },
          {
            text: "Segment-Specific Memberships: Customized plans for individuals, professionals, businesses, institutes, or communities.",
          },
          {
            text: "Plan-Specific Benefits: Exact features, inclusions, and limitations are defined on the membership card/screen at the time of subscription.",
          },
          {
            text: "Introductory or Promotional Plans: Special offers may be time-bound, subject to change, or withdrawn without notice.",
          },
        ],
      },
      {
        title: "Membership Benefits",
        subsections: [
          {
            subtitle: "A. Community",
            items: [
              {
                text: "Access to posting updates, images, videos, articles, and other content.",
              },
              {
                text: "Messaging, chat, and networking tools to connect with members.",
              },
              { text: "Featured member/partner visibility (based on plan)." },
              {
                text: "Verified member/partner badge (eligibility and process vary).",
              },
              {
                text: "Participation in community activities, discussions, and events.",
              },
              {
                text: "Rewards/coins for engagement activities (likes, comments, shares, time spent) subject to plan.",
              },
              {
                text: "Participation in community programs such as challenges, spotlights, or collaborations.",
              },
            ],
          },
          {
            subtitle: "B. Prosite",
            items: [
              {
                text: "Unified professional/organizational page (Prosite) with modules like About, Social Links, Works, Jobs, Gallery, Store, Services, Links, Timeline, Feed, Academy, Blogs, and future modules.",
              },
              {
                text: "Businesses/institutes/communities may add catalogs, courses, services, team members, or events.",
              },
              {
                text: "Storage limits, media uploads, customization options, and features depend on plan.",
              },
              {
                text: "Integration with third-party tools, links, or services may be allowed (subject to approval).",
              },
              {
                text: "Prosite content remains the responsibility of the Member; Atives is not liable for third-party claims.",
              },
            ],
          },
          {
            subtitle: "C. Access",
            items: [
              {
                text: "Access to opportunities (jobs, projects, gigs, collaborations, partnerships, grants, leads).",
              },
              {
                text: "Access to resources, toolkits, and professional growth materials.",
              },
              {
                text: "Priority or exclusive access to certain opportunities based on plan.",
              },
              {
                text: "Access to premium tools, analytics, and insights (depending on plan).",
              },
              {
                text: "Invitations to webinars, workshops, and networking sessions (as available).",
              },
            ],
          },
          {
            subtitle: "D. Monetization",
            items: [
              {
                text: "Affiliate Program: Earn commissions from referrals/upgrades, as defined in affiliate rules.",
              },
              { text: "Activities: Earn coins/rewards for engagement." },
              {
                text: "Coins/Points: Redeemable for renewals, upgrades, services, or withdrawal (subject to eligibility, KYC, and company policies).",
              },
              {
                text: "Network Growth: Earn coins/points as your followers grow.",
              },
              {
                text: "Withdrawals: Subject to minimum thresholds, transaction charges, applicable taxes, and regulatory compliance.",
              },
              {
                text: "Limits & Fair Use: The Company reserves the right to cap earnings, prevent misuse, and revise terms at any time.",
              },
            ],
          },
        ],
      },
      {
        title: "Additional Benefits (Plan-Specific)",
        items: [
          {
            text: "Access to Atives Academy and professional learning content.",
          },
          { text: "Enhanced search ranking and featured listings." },
          { text: "Analytics and performance insights." },
          {
            text: "Business/institute listing tools, including catalogs, events, and community management.",
          },
          {
            text: "Partner program opportunities (co-branding, extra rewards, or joint promotions).",
          },
          { text: "Beta access to new features and early adopter privileges." },
        ],
      },
      {
        title: "Payments, Renewals, and Cancellations",
        items: [
          {
            text: "Membership fees must be paid in full at the time of subscription.",
          },
          {
            text: "Taxes, payment gateway charges, or currency conversion costs are borne by the Member.",
          },
          {
            text: "Recurring plans auto-renew unless cancelled before the renewal date.",
          },
          {
            text: "Lifetime Start Memberships are non-recurring but may have optional upgrades.",
          },
          {
            text: "Failure to pay will result in suspension of membership benefits.",
          },
        ],
      },
      {
        title: "Refund Policy",
        items: [
          { text: "Memberships are generally non-refundable." },
          {
            text: "Refunds may only be issued for technical errors, duplicate payments, or other exceptions at Atives' sole discretion.",
          },
          { text: "Refund requests must be raised within 7 days of payment." },
        ],
      },
      {
        title: "Member Responsibilities",
        items: [
          { text: "Provide accurate and updated account information." },
          { text: "Maintain confidentiality of login credentials." },
          { text: "Ensure that content posted is original or authorized." },
          {
            text: "Use monetization, affiliate, and engagement features fairly.",
          },
          {
            text: "Comply with local laws, regulations, and platform policies.",
          },
        ],
      },
      {
        title: "Prohibited Uses",
        items: [
          { text: "Creating fake accounts or bots to exploit benefits." },
          { text: "Manipulating affiliate/monetization programs." },
          {
            text: "Posting unlawful, harmful, abusive, obscene, or infringing content.",
          },
          { text: "Using Atives for scams, fraud, or illegal transactions." },
          {
            text: "Misrepresenting professional qualifications, services, or offerings.",
          },
        ],
      },
      {
        title: "Limitation of Liability",
        items: [
          {
            text: "Atives provides membership benefits 'as is' without guarantees.",
          },
        ],
        subsections: [
          {
            subtitle: "We are not responsible for:",
            items: [
              { text: "Loss of earnings, opportunities, or data." },
              { text: "Third-party services, links, or integrations." },
              { text: "Content posted by members." },
            ],
          },
        ],
        footer:
          "Our liability is limited to the membership fee paid for the active term.",
      },
      {
        title: "Termination and Suspension",
        items: [
          {
            text: "Membership may be terminated for breach of these Terms, Community Guidelines, or applicable laws.",
          },
          {
            text: "The Company may suspend or revoke access in case of fraud, abuse, or misuse.",
          },
          { text: "Termination does not entitle members to refunds." },
        ],
      },
      {
        title: "Compliance and Taxes",
        items: [
          {
            text: "Members are responsible for declaring and paying applicable taxes on earnings from affiliate or monetization programs.",
          },
          {
            text: "Withdrawals and payouts are subject to applicable laws (Income Tax, GST, RBI/FEMA compliance in India; equivalent rules internationally).",
          },
          {
            text: "The Company may deduct taxes at source (TDS/withholding tax) where required.",
          },
        ],
      },
      {
        title: "Modifications",
        items: [
          {
            text: "Atives may modify membership features, benefits, pricing, or these Terms at any time.",
          },
          {
            text: "Updated terms will be posted on the Platform. Continued use constitutes acceptance.",
          },
        ],
      },
      {
        title: "Governing Law and Jurisdiction",
        items: [
          { text: "These Terms are governed by the laws of India." },
          {
            text: "Any disputes will be subject to the jurisdiction of competent courts at Bhilai, Chhattisgarh, India.",
          },
        ],
      },
      {
        title: "Contact",
        subtitle: "For support, queries, or complaints regarding membership:",
        items: [
          {
            text: "ATIVES WORLD (OPC) PVT LTD\n#20, Commercial Complex, Nehru Nagar East\nBhilai, Chhattisgarh, India – 490020\nEmail: hello@1atives.com",
          },
        ],
      },
    ],
  },
  "Prosite Terms": {
    intro:
      "By creating, submitting, or maintaining a Prosite on Atives, you agree to the following terms and conditions. These terms govern the creation, publication, use, and maintenance of Prosites to ensure quality, accuracy, compliance, and professional standards across the platform.",
    sections: [
      {
        title: "Definition of Prosite",
        items: [
          {
            text: "A Prosite is a digital profile/portfolio hosted on the Atives platform by members, professionals, businesses, institutes, or communities. It may include, but is not limited to: Personal/Professional information (About, Biography, Social Links); Works or Portfolio (Images, Videos, Designs, Projects); Services, Catalogs, or Offerings; Jobs, Opportunities, or Leads; Galleries, Stores, and Product Listings; Timelines, Feeds, Blogs, or Academy/Training Modules; Links to external tools, websites, or resources; Any additional modules/features added in the future.",
          },
          {
            text: "The Prosite serves as a discovery, networking, and monetization tool within the Atives ecosystem.",
          },
        ],
      },
      {
        title: "Eligibility & Membership Requirements",
        items: [
          {
            text: "Only active members with valid Atives membership plans (Start, Pro, Pro+, or Brand Partner) may create a Prosite.",
          },
          {
            text: "Membership must be active and in good standing; unpaid or suspended memberships will prevent Prosite submission or visibility.",
          },
          {
            text: "Prosite submissions must comply with Atives Community Guidelines and Membership Terms.",
          },
        ],
      },
      {
        title: "Submission & Approval Process",
        items: [
          {
            text: "Prosites undergo manual review and verification by the Atives team before being made public.",
          },
        ],
        subsections: [
          {
            subtitle: "Approval timelines:",
            items: [
              { text: "Verified/Pro members: 24–72 hours" },
              {
                text: "Standard members: Up to 30 days, depending on completeness and quality",
              },
            ],
          },
        ],
        footer:
          "Incomplete or low-quality submissions (missing mandatory fields, low-res media, inaccurate details) will be rejected or held for revision. Atives may request edits, additional information, or corrections before approval.",
      },
      {
        title: "Data Accuracy & Responsibility",
        items: [
          {
            text: "All information, media, and links on your Prosite must be authentic, accurate, and up-to-date.",
          },
        ],
        subsections: [
          {
            subtitle:
              "Misrepresentation, false information, or unverified claims may result in:",
            items: [
              { text: "Rejection of the Prosite" },
              { text: "Temporary suspension" },
              { text: "Permanent delisting" },
            ],
          },
        ],
        footer:
          "Members are responsible for updating their Prosite regularly to maintain relevance and accuracy.",
      },
      {
        title: "Media Standards",
        items: [
          {
            text: "Only high-quality images, videos, or other media may be uploaded.",
          },
          { text: "Media must be owned or legally licensed for your use." },
        ],
        subsections: [
          {
            subtitle: "Prohibited content includes:",
            items: [
              {
                text: "Plagiarized or copyrighted material without permission",
              },
              { text: "Pornographic, obscene, violent, or harmful content" },
              { text: "Misleading or false representations" },
            ],
          },
        ],
        footer:
          "Atives reserves the right to remove or delist media that violates these standards.",
      },
      {
        title: "Modules, Features, and Limits",
        items: [
          {
            text: "Access to Prosite modules (Portfolio, Services, Store, Jobs, Blogs, Academy, Feeds, Timelines, etc.) is subject to membership type.",
          },
          {
            text: "Feature limits (media uploads, storage, analytics, visibility, monetization access) are determined by your plan.",
          },
          {
            text: "Additional modules or tools introduced in the future will be subject to plan-specific access and rules.",
          },
          {
            text: "Monetization features (Affiliate, Activity Rewards, Network Earnings) are available per membership plan and require compliance with all Atives terms.",
          },
        ],
      },
      {
        title: "Monetization & Rewards",
        items: [
          {
            text: "Prosites may participate in monetization programs as defined in Membership Terms or Affiliate Terms.",
          },
          {
            text: "Earnings, rewards, coins, or points may be credited based on engagement, affiliate conversions, or network growth.",
          },
          {
            text: "Atives is not responsible for any guarantee of revenue, deals, or engagement outcomes.",
          },
          {
            text: "Misuse of monetization tools, fraudulent activities, or manipulation of engagement metrics will result in suspension, delisting, or legal action.",
          },
        ],
      },
      {
        title: "Verification & Re-Verification",
        items: [
          {
            text: "Prosites may be periodically re-verified by Atives to ensure compliance, accuracy, and quality.",
          },
          {
            text: "Failure to comply with verification requests may result in suspension or removal.",
          },
          {
            text: "Atives reserves the right to enforce guidelines, apply penalties, or revoke Prosite privileges for violations.",
          },
        ],
      },
      {
        title: "Delisting & Suspension",
        subtitle: "Prosites may be temporarily or permanently delisted for:",
        items: [
          {
            text: "Violations of Atives Community Guidelines or Terms of Service",
          },
          {
            text: "Submission of false, misleading, or unverified information",
          },
          { text: "Upload of prohibited or harmful content" },
          { text: "Non-payment or lapse of membership" },
          {
            text: "Fraud, misuse of monetization programs, or unethical conduct",
          },
        ],
      },
      {
        title: "Rights Reserved by Atives",
        subtitle: "Atives reserves the right to:",
        items: [
          {
            text: "Edit formatting or minor content for clarity, readability, and standardization",
          },
          { text: "Archive or remove inactive or non-compliant Prosites" },
          {
            text: "Enforce guidelines and apply penalties for misuse or violations",
          },
          {
            text: "Limit access to certain features based on membership plan or compliance",
          },
          { text: "Introduce new modules, tools, or benefits at any time" },
        ],
      },
      {
        title: "Intellectual Property",
        items: [
          {
            text: "Content on your Prosite remains your property, but you grant Atives a non-exclusive, worldwide, royalty-free license to display it on the platform for discovery, promotion, and community purposes.",
          },
          {
            text: "Prosite users must not use Atives' branding, trademarks, or logos without written permission.",
          },
        ],
      },
      {
        title: "Liability Disclaimer",
        items: [
          {
            text: "Atives acts solely as a discovery and networking platform.",
          },
          {
            text: "We do not guarantee revenue, sales, collaborations, or leads through Prosites.",
          },
          {
            text: "Members are responsible for all agreements, transactions, or collaborations made through their Prosite.",
          },
          {
            text: "Atives is not liable for any damages arising from content posted, misrepresentation by users, or interactions outside the platform.",
          },
        ],
      },
      {
        title: "Compliance & Legal",
        items: [
          {
            text: "Prosite content must comply with all applicable laws and regulations (intellectual property, data protection, advertising, and financial regulations).",
          },
          {
            text: "Prosite owners are solely responsible for their content, transactions, and engagement with other users.",
          },
          {
            text: "Atives may report illegal activity or cooperate with authorities when required.",
          },
        ],
      },
      {
        title: "Modifications",
        items: [
          {
            text: "Atives reserves the right to update these Prosite Terms, add new modules, or modify functionality at any time.",
          },
          {
            text: "Continued use or maintenance of your Prosite constitutes acceptance of updated terms.",
          },
        ],
      },
      {
        title: "Contact",
        subtitle: "For questions or support regarding your Prosite:",
        items: [
          { text: "ATIVES WORLD (OPC) PVT LTD\nEmail: hello@1atives.com" },
        ],
      },
    ],
  },
  Other: {
    intro:
      "By accessing, engaging with, or responding to any work, project, or opportunity posted on Atives, you acknowledge and agree to the following terms and conditions.",
    sections: [
      {
        title: "Platform Role",
        items: [
          {
            text: "Atives is a discovery and networking platform that facilitates the visibility of opportunities shared by clients, members, businesses, institutes, or communities.",
          },
          {
            text: "Opportunities may be posted by Atives on behalf of requests, but Atives is under no obligation to do so.",
          },
          {
            text: "Responsibility for the content, accuracy, and legitimacy of posted opportunities rests entirely with the original poster (client, member, or visitor).",
          },
        ],
      },
      {
        title: "No Involvement in Transactions",
        items: [
          {
            text: "Atives does not mediate, guarantee, or oversee communications, negotiations, transactions, agreements, or disputes between users and opportunity posters.",
          },
          {
            text: "Atives is not responsible for any deals, contracts, or payments arising from posted opportunities.",
          },
        ],
      },
      {
        title: "No Guarantees",
        items: [
          {
            text: "Atives does not guarantee revenue, sales, collaborations, or successful outcomes from any posted opportunities.",
          },
          {
            text: "Engagement with projects or opportunities is entirely at the user's own risk.",
          },
        ],
      },
      {
        title: "Data & Content Responsibility",
        items: [
          {
            text: "All project details, media, and descriptions are provided by the original poster.",
          },
          {
            text: "Atives is not responsible for the accuracy, authenticity, legality, or completeness of posted opportunities.",
          },
          {
            text: "Atives reserves the right to edit, remove, or decline listings that violate guidelines, contain misleading information, or are deemed inappropriate.",
          },
        ],
      },
      {
        title: "User Caution & Due Diligence",
        items: [
          {
            text: "Users, members, and brand partners should verify all details directly with the opportunity poster before entering into any agreements.",
          },
          {
            text: "Atives recommends independent verification and professional caution when engaging with any project, work, or opportunity.",
          },
        ],
      },
      {
        title: "No Fees or Charges by Atives",
        items: [
          {
            text: "Atives does not charge fees, commissions, or participate in any financial transactions related to posted opportunities.",
          },
          {
            text: "All payments, agreements, or contractual arrangements are solely between the poster and the user.",
          },
        ],
      },
      {
        title: "Atives Rights & Discretion",
        subtitle: "Atives reserves the right to:",
        items: [
          {
            text: "Decline, remove, or suspend any posting at its discretion.",
          },
          {
            text: "Edit formatting, structure, or minor content for clarity, consistency, and standardization.",
          },
          {
            text: "Periodically review posted content to maintain platform quality and compliance.",
          },
          {
            text: "Apply penalties, restrictions, or delisting for violations of these terms or community standards.",
          },
        ],
      },
      {
        title: "Disclaimer & Limitation of Liability",
        items: [
          {
            text: "Posted opportunities remain the property of the original poster.",
          },
          {
            text: "Atives is not liable for any losses, disputes, damages, or claims arising from engagement with any posted opportunity.",
          },
          {
            text: "All responsibility for verification, agreements, and transactions lies entirely with the users and posters.",
          },
        ],
      },
      {
        title: "Compliance & Legal",
        items: [
          {
            text: "Users and posters must comply with all applicable laws, including intellectual property, labor, data protection, and financial regulations.",
          },
          {
            text: "Atives may cooperate with legal authorities if required, including sharing information about posted opportunities or user interactions.",
          },
        ],
      },
      {
        title: "Contact & Support",
        subtitle:
          "For questions or assistance regarding posted opportunities, contact:",
        items: [
          { text: "ATIVES WORLD (OPC) PVT LTD\nEmail: hello@1atives.com" },
        ],
      },
    ],
  },
};

const TermsSheet = ({
  open,
  onOpenChange,
  lastUpdatedText,
  toggleOptions = categoryList,
  toggleActiveOption = "Privacy Policy",
}) => {
  const updatedText = lastUpdatedText || "Last updated recently";
  const [activeOption, setActiveOption] = useState(toggleActiveOption);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open) setActiveOption(toggleActiveOption);
  }, [open, toggleActiveOption]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeOption]);

  const currentTerms = termsContent[activeOption];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          "flex flex-col gap-0 overflow-hidden border-white/10 bg-gradient-to-br from-[#05050A] via-[#0a0f1f] to-blue-950/90 p-0 shadow-[0_0_60px_rgba(0,0,0,0.55)]",
          "[&>button]:hidden",
          "max-sm:inset-x-0 max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:top-auto max-sm:h-[92dvh] max-sm:max-h-[92dvh] max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-t-[28px] max-sm:rounded-b-none max-sm:pb-[env(safe-area-inset-bottom)]",
          "sm:fixed sm:!bottom-auto sm:!left-1/2 sm:!top-1/2 sm:h-[min(85vh,720px)] sm:w-[min(92vw,42rem)] sm:max-w-2xl sm:!-translate-x-1/2 sm:!-translate-y-1/2 sm:rounded-[24px]"
        )}
      >
        <div
          className="mx-auto mb-1 mt-3 h-1 w-10 shrink-0 rounded-full bg-white/20 sm:hidden"
          aria-hidden
        />

        <SheetHeader className="shrink-0 space-y-0 border-b border-white/[0.06] px-4 pb-3 pt-2 sm:px-6 sm:pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 ring-1 ring-white/10">
                <DocumentIcon className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <SheetTitle className="text-left text-base font-semibold leading-tight tracking-tight text-white sm:text-lg">
                  Terms & Conditions
                </SheetTitle>
                <p className="mt-0.5 truncate text-[11px] text-white/45 sm:text-xs">
                  {updatedText}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/15 hover:text-white"
              aria-label="Close terms"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </SheetHeader>

        <div className="shrink-0 border-b border-white/[0.06] px-4 py-3 sm:px-6">
          <CategoryTabs
            options={toggleOptions}
            activeOption={activeOption}
            onOptionChange={setActiveOption}
          />
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5"
        >
          {currentTerms ? (
            <div className="space-y-4 sm:space-y-5">
              {currentTerms.intro && (
                <p className="whitespace-pre-line rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-white/75 sm:text-sm">
                  {linkifyText(currentTerms.intro)}
                </p>
              )}

              {currentTerms.sections?.map((section, sectionIndex) => (
                <TermsSection
                  key={`${activeOption}-${sectionIndex}`}
                  section={section}
                  index={sectionIndex}
                />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-sm text-white/50">
              No content available for this category.
            </p>
          )}
        </div>

        <div className="shrink-0 border-t border-white/[0.06] bg-black/20 px-4 py-3 text-center sm:px-6">
          <p className="text-[10px] leading-relaxed text-white/40 sm:text-[11px]">
            Questions?{" "}
            <a
              href="mailto:hello@1atives.com"
              className="text-blue-300/90 underline-offset-2 hover:text-blue-200 hover:underline"
            >
              hello@1atives.com
            </a>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TermsSheet;
