export interface JobTitle {
  title: string;
  questions: string[];
}

export interface JobCategory {
  id: string;
  categoryName: string;
  jobs: JobTitle[];
}

function generateQuestionsFor(title: string, category: string): string[] {
  return [
    `What are the core responsibilities of a ${title}?`,
    `Describe a challenging project you handled as a ${title}.`,
    `What software tools are essential for a ${title} in ${category}?`,
    `How do you stay updated with the latest trends in ${category}?`,
    `Explain a complex technical concept related to ${title} to a non-technical person.`,
    `What is the most critical safety or quality standard a ${title} must adhere to?`,
    `Describe your experience with project management as a ${title}.`,
    `How do you handle disputes with contractors or team members?`,
    `What QA/QC processes do you implement in your role?`,
    `How do you approach problem-solving when an unexpected issue arises?`,
    `What metrics do you use to measure success in your role as a ${title}?`,
    `Describe a time you had to optimize a process or design.`,
    `How do you ensure compliance with industry regulations?`,
    `What is your approach to risk management in ${category} projects?`,
    `Describe your experience with cost estimation and budgeting.`,
    `How do you prioritize tasks when managing multiple deadlines?`,
    `What role does sustainability play in your work as a ${title}?`,
    `How do you communicate technical requirements to stakeholders?`,
    `What is the biggest challenge facing a ${title} today?`,
    `Where do you see the field of ${category} evolving in the next 5 years?`
  ];
}

export const jobCategories: JobCategory[] = [
  {
    "id": "civil-engineering",
    "categoryName": "Civil Engineering",
    "jobs": [
      "Civil Engineer",
      "Graduate Civil Engineer",
      "Junior Civil Engineer",
      "Assistant Civil Engineer",
      "Senior Civil Engineer",
      "Principal Civil Engineer",
      "Structural Engineer",
      "Site Engineer",
      "Resident Engineer",
      "Construction Engineer",
      "Project Engineer",
      "Highway Engineer",
      "Bridge Engineer",
      "Geotechnical Engineer",
      "Water Resources Engineer",
      "Environmental Engineer",
      "Quantity Surveyor",
      "Estimation Engineer",
      "Planning Engineer",
      "QA/QC Engineer",
      "Survey Engineer",
      "BIM Engineer",
      "Municipal Engineer",
      "Transportation Engineer",
      "Irrigation Engineer"
    ]
  },
  {
    "id": "mechanical-engineering",
    "categoryName": "Mechanical Engineering",
    "jobs": [
      "Mechanical Engineer",
      "Graduate Mechanical Engineer",
      "Junior Mechanical Engineer",
      "Senior Mechanical Engineer",
      "Lead Mechanical Engineer",
      "Principal Mechanical Engineer",
      "Design Engineer",
      "Mechanical Design Engineer",
      "Production Engineer",
      "Manufacturing Engineer",
      "Maintenance Engineer",
      "Plant Engineer",
      "Process Engineer",
      "HVAC Engineer",
      "Piping Engineer",
      "Rotating Equipment Engineer",
      "Static Equipment Engineer",
      "Turbine Engineer",
      "Compressor Engineer",
      "Pump Engineer",
      "Boiler Engineer",
      "Welding Engineer",
      "Reliability Engineer",
      "Asset Integrity Engineer",
      "Mechanical Project Engineer",
      "Mechanical Project Manager",
      "Service Engineer",
      "Installation Engineer",
      "Commissioning Engineer",
      "Marine Mechanical Engineer"
    ]
  },
  {
    "id": "electrical-engineering",
    "categoryName": "Electrical Engineering",
    "jobs": [
      "Electrical Engineer",
      "Graduate Electrical Engineer",
      "Junior Electrical Engineer",
      "Senior Electrical Engineer",
      "Power Systems Engineer",
      "High Voltage Engineer",
      "Low Voltage Engineer",
      "Protection Engineer",
      "Relay Engineer",
      "Transmission Engineer",
      "Distribution Engineer",
      "Substation Engineer",
      "Switchgear Engineer",
      "Solar Electrical Engineer",
      "Electrical Design Engineer",
      "Electrical Project Engineer",
      "Electrical Site Engineer",
      "Electrical Maintenance Engineer",
      "Commissioning Engineer",
      "Testing Engineer",
      "Lighting Engineer",
      "Earthing Engineer",
      "Power Plant Engineer",
      "Renewable Energy Engineer"
    ]
  },
  {
    "id": "electronics-communication-engineering",
    "categoryName": "Electronics & Communication Engineering",
    "jobs": [
      "Electronics Engineer",
      "Electronics Design Engineer",
      "Embedded Engineer",
      "Embedded Software Engineer",
      "PCB Design Engineer",
      "RF Engineer",
      "Microwave Engineer",
      "Antenna Engineer",
      "Signal Processing Engineer",
      "Communication Engineer",
      "Telecom Engineer",
      "Wireless Engineer",
      "Satellite Engineer",
      "VLSI Engineer",
      "FPGA Engineer",
      "ASIC Engineer",
      "Hardware Engineer",
      "Firmware Engineer",
      "Control Systems Engineer",
      "IoT Engineer"
    ]
  },
  {
    "id": "instrumentation-engineering",
    "categoryName": "Instrumentation Engineering",
    "jobs": [
      "Instrumentation Engineer",
      "Instrument Engineer",
      "Control Engineer",
      "Automation Engineer",
      "SCADA Engineer",
      "PLC Engineer",
      "DCS Engineer",
      "Control Systems Engineer",
      "Calibration Engineer",
      "Process Control Engineer",
      "Field Instrument Engineer",
      "Commissioning Engineer",
      "Industrial Automation Engineer",
      "Instrument Design Engineer",
      "Maintenance Engineer"
    ]
  },
  {
    "id": "chemical-engineering",
    "categoryName": "Chemical Engineering",
    "jobs": [
      "Chemical Engineer",
      "Process Engineer",
      "Plant Engineer",
      "Refinery Engineer",
      "Petrochemical Engineer",
      "Polymer Engineer",
      "Process Design Engineer",
      "Production Engineer",
      "Chemical Plant Engineer",
      "Process Safety Engineer",
      "Process Control Engineer",
      "Fertilizer Engineer",
      "Gas Processing Engineer",
      "Water Treatment Engineer",
      "Wastewater Engineer"
    ]
  },
  {
    "id": "automobile-engineering",
    "categoryName": "Automobile Engineering",
    "jobs": [
      "Automobile Engineer",
      "Automotive Engineer",
      "Vehicle Engineer",
      "Design Engineer",
      "Chassis Engineer",
      "Engine Engineer",
      "Powertrain Engineer",
      "Transmission Engineer",
      "Vehicle Dynamics Engineer",
      "EV Engineer",
      "Electric Vehicle Engineer",
      "Battery Engineer",
      "Automotive Testing Engineer",
      "Automotive Quality Engineer",
      "Automotive Service Engineer"
    ]
  },
  {
    "id": "aerospace-engineering",
    "categoryName": "Aerospace Engineering",
    "jobs": [
      "Aerospace Engineer",
      "Aeronautical Engineer",
      "Aircraft Design Engineer",
      "Aircraft Maintenance Engineer",
      "Flight Test Engineer",
      "Propulsion Engineer",
      "Avionics Engineer",
      "Structural Aerospace Engineer",
      "Space Systems Engineer",
      "Satellite Engineer",
      "Rocket Engineer",
      "Aircraft Manufacturing Engineer"
    ]
  },
  {
    "id": "mining-engineering",
    "categoryName": "Mining Engineering",
    "jobs": [
      "Mining Engineer",
      "Mine Planning Engineer",
      "Open Pit Engineer",
      "Underground Mining Engineer",
      "Blasting Engineer",
      "Drilling Engineer",
      "Mineral Processing Engineer",
      "Ventilation Engineer",
      "Rock Mechanics Engineer",
      "Mine Surveyor"
    ]
  },
  {
    "id": "petroleum-engineering",
    "categoryName": "Petroleum Engineering",
    "jobs": [
      "Petroleum Engineer",
      "Drilling Engineer",
      "Reservoir Engineer",
      "Production Engineer",
      "Well Completion Engineer",
      "Mud Engineer",
      "Cementing Engineer",
      "Pipeline Engineer",
      "Offshore Engineer",
      "Oil & Gas Engineer",
      "LNG Engineer",
      "Gas Processing Engineer"
    ]
  },
  {
    "id": "industrial-engineering",
    "categoryName": "Industrial Engineering",
    "jobs": [
      "Industrial Engineer",
      "Process Improvement Engineer",
      "Lean Engineer",
      "Six Sigma Engineer",
      "Operations Engineer",
      "Supply Chain Engineer",
      "Logistics Engineer",
      "Production Planning Engineer",
      "Continuous Improvement Engineer",
      "Manufacturing Systems Engineer"
    ]
  },
  {
    "id": "production-engineering",
    "categoryName": "Production Engineering",
    "jobs": [
      "Production Engineer",
      "Manufacturing Engineer",
      "Plant Engineer",
      "Production Planning Engineer",
      "Process Engineer",
      "Assembly Engineer",
      "Production Supervisor",
      "Shift Engineer",
      "Lean Manufacturing Engineer",
      "Industrial Production Engineer"
    ]
  },
  {
    "id": "manufacturing-engineering",
    "categoryName": "Manufacturing Engineering",
    "jobs": [
      "Manufacturing Engineer",
      "CNC Engineer",
      "Tool Design Engineer",
      "Tooling Engineer",
      "Process Engineer",
      "Industrial Engineer",
      "Factory Engineer",
      "Production Engineer",
      "Robotics Manufacturing Engineer",
      "Manufacturing Quality Engineer"
    ]
  },
  {
    "id": "mechatronics-engineering",
    "categoryName": "Mechatronics Engineering",
    "jobs": [
      "Mechatronics Engineer",
      "Robotics Engineer",
      "Automation Engineer",
      "PLC Engineer",
      "Control Engineer",
      "Embedded Engineer",
      "Industrial Automation Engineer",
      "Robotics Programmer",
      "Motion Control Engineer"
    ]
  },
  {
    "id": "robotics-engineering",
    "categoryName": "Robotics Engineering",
    "jobs": [
      "Robotics Engineer",
      "Robotics Software Engineer",
      "Robotics Hardware Engineer",
      "Autonomous Systems Engineer",
      "Vision Engineer",
      "AI Robotics Engineer",
      "Automation Engineer",
      "Robot Programmer",
      "Robot Integration Engineer"
    ]
  },
  {
    "id": "computer-science-software-engineering",
    "categoryName": "Computer Science / Software Engineering",
    "jobs": [
      "Software Engineer",
      "Software Developer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Web Developer",
      "Mobile App Developer",
      "Android Developer",
      "iOS Developer",
      "Flutter Developer",
      "React Developer",
      "Java Developer",
      "Python Developer",
      "PHP Developer",
      ".NET Developer",
      "C++ Developer",
      "Go Developer",
      "Rust Developer",
      "API Developer",
      "Software Architect",
      "Technical Lead",
      "Engineering Manager"
    ]
  },
  {
    "id": "information-technology",
    "categoryName": "Information Technology",
    "jobs": [
      "IT Executive",
      "IT Support Engineer",
      "Desktop Support Engineer",
      "System Administrator",
      "Network Administrator",
      "Technical Support Engineer",
      "IT Infrastructure Engineer",
      "IT Operations Engineer",
      "System Engineer",
      "Technical Consultant",
      "Help Desk Engineer",
      "IT Manager"
    ]
  },
  {
    "id": "data-science",
    "categoryName": "Data Science",
    "jobs": [
      "Data Scientist",
      "Data Analyst",
      "Business Intelligence Analyst",
      "Machine Learning Engineer",
      "AI Engineer",
      "NLP Engineer",
      "Computer Vision Engineer",
      "Analytics Engineer",
      "Decision Scientist",
      "Research Scientist"
    ]
  },
  {
    "id": "artificial-intelligence-machine-learning",
    "categoryName": "Artificial Intelligence & Machine Learning",
    "jobs": [
      "AI Engineer",
      "Machine Learning Engineer",
      "Deep Learning Engineer",
      "NLP Engineer",
      "Computer Vision Engineer",
      "AI Research Engineer",
      "LLM Engineer",
      "Prompt Engineer",
      "AI Solutions Engineer",
      "Generative AI Engineer",
      "MLOps Engineer"
    ]
  },
  {
    "id": "cybersecurity",
    "categoryName": "Cybersecurity",
    "jobs": [
      "Cybersecurity Engineer",
      "Security Analyst",
      "Security Engineer",
      "SOC Analyst",
      "Penetration Tester",
      "Ethical Hacker",
      "Information Security Engineer",
      "Security Consultant",
      "Cloud Security Engineer",
      "Application Security Engineer",
      "Network Security Engineer",
      "Incident Response Engineer",
      "Digital Forensics Analyst"
    ]
  },
  {
    "id": "cloud-engineering",
    "categoryName": "Cloud Engineering",
    "jobs": [
      "Cloud Engineer",
      "AWS Engineer",
      "Azure Engineer",
      "Google Cloud Engineer",
      "Cloud Architect",
      "Cloud Infrastructure Engineer",
      "Cloud Administrator",
      "Cloud Security Engineer",
      "Cloud Consultant",
      "Site Reliability Engineer (SRE)"
    ]
  },
  {
    "id": "devops",
    "categoryName": "DevOps",
    "jobs": [
      "DevOps Engineer",
      "Site Reliability Engineer (SRE)",
      "Platform Engineer",
      "Infrastructure Engineer",
      "Release Engineer",
      "Build Engineer",
      "CI/CD Engineer",
      "Kubernetes Engineer",
      "Docker Engineer",
      "Automation Engineer"
    ]
  },
  {
    "id": "network-engineering",
    "categoryName": "Network Engineering",
    "jobs": [
      "Network Engineer",
      "Network Administrator",
      "Network Architect",
      "Wireless Network Engineer",
      "LAN Engineer",
      "WAN Engineer",
      "Routing & Switching Engineer",
      "Network Security Engineer",
      "Telecom Network Engineer",
      "NOC Engineer"
    ]
  },
  {
    "id": "architecture",
    "categoryName": "Architecture",
    "jobs": [
      "Architect",
      "Junior Architect",
      "Senior Architect",
      "Design Architect",
      "Project Architect",
      "Urban Designer",
      "Landscape Architect",
      "Interior Architect",
      "BIM Architect",
      "Conservation Architect"
    ]
  },
  {
    "id": "interior-design",
    "categoryName": "Interior Design",
    "jobs": [
      "Interior Designer",
      "Interior Architect",
      "Space Planner",
      "Residential Interior Designer",
      "Commercial Interior Designer",
      "Furniture Designer",
      "Kitchen Designer",
      "Lighting Designer",
      "Exhibition Designer",
      "Interior Project Manager"
    ]
  },
  {
    "id": "hvac-engineering",
    "categoryName": "HVAC Engineering",
    "jobs": [
      "HVAC Engineer",
      "HVAC Design Engineer",
      "HVAC Site Engineer",
      "HVAC Project Engineer",
      "HVAC Maintenance Engineer",
      "HVAC Commissioning Engineer",
      "Refrigeration Engineer",
      "Ventilation Engineer",
      "MEP Engineer",
      "Building Services Engineer"
    ]
  },
  {
    "id": "fire-safety-engineering",
    "categoryName": "Fire & Safety Engineering",
    "jobs": [
      "Fire Protection Engineer",
      "Fire Safety Engineer",
      "HSE Engineer",
      "EHS Engineer",
      "Safety Engineer",
      "Fire Alarm Engineer",
      "Fire Fighting Engineer",
      "Occupational Health & Safety Engineer",
      "Industrial Safety Engineer",
      "Risk Assessment Engineer"
    ]
  },
  {
    "id": "renewable-energy-engineering",
    "categoryName": "Renewable Energy Engineering",
    "jobs": [
      "Renewable Energy Engineer",
      "Solar Engineer",
      "Solar Design Engineer",
      "Solar PV Engineer",
      "Wind Energy Engineer",
      "Hydro Power Engineer",
      "Battery Storage Engineer",
      "Energy Engineer",
      "Energy Consultant",
      "Sustainability Engineer",
      "Green Building Engineer",
      "Energy Auditor"
    ]
  }
].map(cat => ({
  id: cat.id,
  categoryName: cat.categoryName,
  jobs: cat.jobs.map(title => ({
    title,
    questions: generateQuestionsFor(title, cat.categoryName)
  }))
}));
