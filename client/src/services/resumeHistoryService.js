const API_BASE = "http://localhost:5000/api";

export const saveResume = async ({ resumeId, payload, token }) => {
  let response;

  if (resumeId) {
    response = await fetch(`${API_BASE}/resumes/${resumeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    let result = await response.json(); // ✅ Read once

    // If resume not found (DB reset case)
    if (!response.ok && result.error === "Resume not found") {
      localStorage.removeItem("resume_id");

      response = await fetch(`${API_BASE}/resumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      result = await response.json(); // ✅ Read once again for new request
    }

    return result; // ✅ Return already-read result
  }

  response = await fetch(`${API_BASE}/resumes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return await response.json(); // ✅ Single read
};


export const undoResume = async ({ resumeId, token }) => {
  const res = await fetch(`${API_BASE}/undo-redo/${resumeId}/undo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const redoResume = async ({ resumeId, token }) => {
  const res = await fetch(`${API_BASE}/undo-redo/${resumeId}/redo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};