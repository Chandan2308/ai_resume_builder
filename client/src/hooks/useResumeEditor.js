import { saveResume, undoResume, redoResume } from "../services/resumeHistoryService";
import { toast } from "react-toastify";

export const useResumeEditor = ({
  templateId,
  localData,
  setLocalData,
  setResumeData,
  setEditMode
}) => {

  const token = localStorage.getItem("auth_token");

  const buildPayload = () => ({
    title: localData.name || "Resume",
    templateId,
    personalInfo: {
      name: localData.name,
      role: localData.role,
      email: localData.email,
      phone: localData.phone,
      location: localData.location,
      linkedin: localData.linkedin,
      github: localData.github,
      portfolio: localData.portfolio
    },
    summary: localData.summary,
    skills: localData.skills || [],
    experience: localData.experience || [],
    education: localData.education || [],
    projects: localData.projects || [],
    certifications: localData.certifications || [],
    achievements: localData.achievements || [],
    languages: localData.languages || [],
    interests: localData.interests || []
  });

  const handleSave = async () => {
    try {
      const resumeId = localStorage.getItem("resume_id");

      const result = await saveResume({
        resumeId,
        payload: buildPayload(),
        token
      });

      if (result?.data?.id) {
        localStorage.setItem("resume_id", result.data.id);
      }

      toast.success("Resume saved!");
      setEditMode(false);

    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  const handleUndo = async () => {
    const resumeId = localStorage.getItem("resume_id");
    const result = await undoResume({ resumeId, token });

    if (result.success) {
      const section = result.sectionType;

      setResumeData(prev => ({
        ...prev,
        [section]: result.data
      }));

      setLocalData(prev => ({
        ...prev,
        [section]: result.data
      }));

      toast.success("Undo applied");
    } else {
      toast.info(result.message);
    }
  };

  const handleRedo = async () => {
    const resumeId = localStorage.getItem("resume_id");
    const result = await redoResume({ resumeId, token });

    if (result.success) {
      const section = result.sectionType;

      setResumeData(prev => ({
        ...prev,
        [section]: result.data
      }));

      setLocalData(prev => ({
        ...prev,
        [section]: result.data
      }));

      toast.success("Redo applied");
    } else {
      toast.info(result.message);
    }
  };

  return { handleSave, handleUndo, handleRedo };
};