import "./polyfill.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // 1. Create or fetch demo recruiter
        const recruiterEmail = "recruiter@demo.com";
        let recruiter = await User.findOne({ email: recruiterEmail });
        if (!recruiter) {
            const hashedPassword = await bcrypt.hash("recruiter123", 10);
            recruiter = await User.create({
                fullname: "Sarah Recruiter",
                email: recruiterEmail,
                phoneNumber: 9876543210,
                password: hashedPassword,
                role: "recruiter",
                profile: {
                    bio: "Senior Technical Talent Partner",
                    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                }
            });
            console.log("Created demo recruiter:", recruiterEmail);
        }

        // 2. Create demo companies
        const companiesData = [
            {
                name: "Google",
                description: "Organizing the world's information and making it universally accessible and useful.",
                website: "https://google.com",
                location: "Bangalore, India",
                logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                userId: recruiter._id
            },
            {
                name: "Microsoft",
                description: "Empowering every person and every organization on the planet to achieve more.",
                website: "https://microsoft.com",
                location: "Hyderabad, India",
                logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
                userId: recruiter._id
            },
            {
                name: "Amazon",
                description: "Earth's most customer-centric company, leader in e-commerce and cloud computing.",
                website: "https://amazon.com",
                location: "Bangalore, India",
                logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                userId: recruiter._id
            },
            {
                name: "Netflix",
                description: "The world's leading streaming entertainment service with award-winning tech.",
                website: "https://netflix.com",
                location: "Mumbai, India",
                logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
                userId: recruiter._id
            },
            {
                name: "Meta",
                description: "Giving people the power to build community and bring the world closer together.",
                website: "https://meta.com",
                location: "Gurugram, India",
                logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
                userId: recruiter._id
            }
        ];

        const companyMap = {};
        for (const c of companiesData) {
            let existing = await Company.findOne({ name: c.name });
            if (!existing) {
                existing = await Company.create(c);
                console.log(`Created company: ${c.name}`);
            }
            companyMap[c.name] = existing;
        }

        // 3. Create demo jobs
        const jobsData = [
            {
                title: "Frontend Developer",
                description: "We are seeking a talented Frontend Engineer proficient in React, Redux, and modern CSS frameworks to craft responsive, blazing-fast web applications.",
                requirements: ["React.js", "JavaScript", "HTML/CSS", "Redux Toolkit", "Tailwind CSS"],
                salary: 12,
                experienceLevel: 2,
                location: "Bangalore",
                jobType: "Full Time",
                position: 3,
                company: companyMap["Google"]._id,
                created_by: recruiter._id
            },
            {
                title: "Backend Engineer",
                description: "Join our core platform engineering team building robust distributed microservices with Node.js, Express, MongoDB, and AWS cloud infrastructure.",
                requirements: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Docker"],
                salary: 15,
                experienceLevel: 3,
                location: "Hyderabad",
                jobType: "Full Time",
                position: 2,
                company: companyMap["Microsoft"]._id,
                created_by: recruiter._id
            },
            {
                title: "Full Stack Developer",
                description: "Looking for an all-round MERN Stack Developer capable of architecting scalable applications from UI components down to database models.",
                requirements: ["MongoDB", "Express.js", "React.js", "Node.js", "TypeScript"],
                salary: 18,
                experienceLevel: 4,
                location: "Remote",
                jobType: "Full Time",
                position: 4,
                company: companyMap["Amazon"]._id,
                created_by: recruiter._id
            },
            {
                title: "UI/UX Designer & Developer",
                description: "Passionate about creating delightful user experiences? We need a product designer with front-end prototyping skills in Figma and React.",
                requirements: ["Figma", "UI/UX Design", "Wireframing", "React.js", "Prototyping"],
                salary: 10,
                experienceLevel: 1,
                location: "Mumbai",
                jobType: "Part Time",
                position: 2,
                company: companyMap["Netflix"]._id,
                created_by: recruiter._id
            },
            {
                title: "DevOps & Cloud Engineer",
                description: "Manage CI/CD deployment pipelines, container orchestration with Kubernetes, and maintain high-availability cloud infrastructure.",
                requirements: ["Kubernetes", "Docker", "AWS", "CI/CD", "Linux"],
                salary: 20,
                experienceLevel: 5,
                location: "Gurugram",
                jobType: "Full Time",
                position: 1,
                company: companyMap["Meta"]._id,
                created_by: recruiter._id
            },
            {
                title: "React Native Mobile Developer",
                description: "Build cross-platform iOS and Android mobile applications using React Native and modern mobile performance best practices.",
                requirements: ["React Native", "JavaScript", "Redux", "REST APIs", "Mobile Design"],
                salary: 14,
                experienceLevel: 2,
                location: "Bangalore",
                jobType: "Full Time",
                position: 2,
                company: companyMap["Google"]._id,
                created_by: recruiter._id
            }
        ];

        for (const job of jobsData) {
            const existingJob = await Job.findOne({ title: job.title, company: job.company });
            if (!existingJob) {
                await Job.create(job);
                console.log(`Created job: ${job.title} at ${job.location}`);
            }
        }

        console.log("Seeding finished successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedData();
