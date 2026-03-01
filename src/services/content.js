// Fetch site content from local JSON files
import homeJson from './home.json';
import aboutJson from './about.json';
import contactJson from './contact.json';
import jobsJson from './jobs.json';

export async function fetchSiteContent() {
  // Simulate async fetch - can be replaced with actual API calls later
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        home: homeJson,
        about: aboutJson,
        contact: contactJson
      });
    }, 100);
  });
}

export async function fetchJobsFromGitHub() {
  // Simulate async fetch - can be replaced with actual API calls later
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobsJson);
    }, 100);
  });
}
