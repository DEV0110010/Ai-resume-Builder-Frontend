import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async () => {
    console.log("Looking for resumeId:", resumeId);
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title || "Resume Builder";
    }
  };
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    {
      id: "personal",
      name: "Personal Info",
      icon: User,
    },
    {
      id: "summary",
      name: "Summary",
      icon: FileText,
    },
    {
      id: "experience",
      name: "Experience",
      icon: Briefcase,
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
    },
    {
      id: "projects",
      name: "Projects",
      icon: FolderIcon,
    },
    {
      id: "skills",
      name: "Skills",
      icon: Sparkles,
    },
  ];

  const activeSession = sections[activeSessionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
          to="/app"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* left panel */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* progress bar using active session index */}

              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000 "
                style={{
                  width: `${
                    (activeSessionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* section navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=> setResumeData(prev=>({...prev, template}))} />
                    <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=> setResumeData(prev => ({...prev, accent_color:color}))} />
                </div>
                <div className="flex items-center">
                  {activeSessionIndex !== 0 && (
                    <button
                      onClick={() => {
                        setActiveSessionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        );
                      }}
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSessionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setActiveSessionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1)
                      );
                    }}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSessionIndex === sections.length - 1 && "opacity-50"
                    }`}
                    disabled={activeSessionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {activeSession.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
              </div>
            </div>
          </div>

          {/* right panel */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div>{/* buttons */}</div>

            {/* resume preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
