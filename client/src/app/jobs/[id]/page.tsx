import { notFound } from 'next/navigation'
import { MapPin, DollarSign, Briefcase, Clock, Building } from 'lucide-react'

// This would typically come from an API or database
const jobs = [
  { 
    id: 1, 
    title: 'Software Engineer', 
    company: 'Tech Co', 
    location: 'San Francisco, CA', 
    salary: '$100,000 - $150,000',
    jobType: 'Full-time',
    postedDate: '2023-05-15',
    description: 'We are looking for a talented software engineer to join our team. The ideal candidate will have experience in full-stack development, with a focus on modern web technologies.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience in software development',
      'Proficiency in JavaScript, TypeScript, and React',
      'Experience with Node.js and Express',
      'Familiarity with cloud platforms (AWS, Azure, or GCP)',
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible work hours and remote work options',
      'Professional development budget',
      '401(k) matching',
    ],
  },
  { id: 2, title: 'Data Analyst', company: 'Data Inc', location: 'New York, NY', description: 'We need a data analyst to help us make sense of our big data...', salary: '$80,000 - $120,000', jobType: 'Full-time', postedDate: '2023-05-10', requirements: [], benefits: [] },
  { id: 3, title: 'Product Manager', company: 'Product Labs', location: 'Austin, TX', description: 'We are seeking an experienced product manager to lead our product development...', salary: '$120,000 - $180,000', jobType: 'Full-time', postedDate: '2023-05-01', requirements: [], benefits: [] },
]

export default async function JobDetails(props: { params: Promise<{ id: string }> }) {
  const { params: paramsPromise } = props
  const params = await paramsPromise
  const job = jobs.find(job => job.id === parseInt(params.id))

  if (!job) {
    notFound()
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <div className="flex items-center text-gray-600 mb-6">
        <Building size={20} className="mr-2" />
        <span className="mr-4">{job.company}</span>
        <MapPin size={20} className="mr-2" />
        <span>{job.location}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-600">
          <DollarSign size={20} className="mr-2" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Briefcase size={20} className="mr-2" />
          <span>{job.jobType}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock size={20} className="mr-2" />
          <span>Posted on {job.postedDate}</span>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
        <ul className="list-disc list-inside text-gray-700">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
        <ul className="list-disc list-inside text-gray-700">
          {job.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  )
}

