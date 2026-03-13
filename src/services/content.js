// Fetch site content from local JSON files
import homeJson from './home.json';
import aboutJson from './about.json';
import contactJson from './contact.json';
import jobsJson from './jobs.json';
import servicesJson from './services.json';
import industriesJson from './industries.json';

export async function fetchSiteContent() {
  // Simulate async fetch - can be replaced with actual API calls later
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        home: homeJson,
        about: aboutJson,
        contact: contactJson,
        services: servicesJson,
        industries: industriesJson
      });
    }, 100);
  });
}

export async function fetchServices() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(servicesJson);
    }, 100);
  });
}

export async function fetchServiceBySlug(slug) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const match = servicesJson.find((service) => service.slug === slug) || null;
      resolve(match);
    }, 100);
  });
}

export async function fetchIndustries() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(industriesJson);
    }, 100);
  });
}

export async function fetchIndustryBySlug(slug) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const match = industriesJson.items.find((industry) => industry.slug === slug) || null;
      resolve(match);
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
