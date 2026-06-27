/**
 * Curated HD photo + video URLs.
 * Unsplash + Pexels CDNs allow direct hot-linking with query string sizing.
 * Each entry is a real, currently-live asset chosen for the design.
 */

const unsplash = (id: string, w = 2200, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const media = {
  // Hero: tall modern building looking up
  heroBuilding: unsplash("1545324418-cc1a3fa10c00", 2200),
  heroBuildingPortrait: unsplash("1486325212027-8081e485255e", 1600),

  // VAMAR brand reveal background
  findBackdrop: unsplash("1496564203457-11bb12075d90", 2600), // architectural facade
  findClouds: unsplash("1500964757637-c85e8a162699", 2400), // clouds/sky

  // Life-changing — UAE landmarks (Burj Khalifa, Dubai skyline)
  nycSkyline: unsplash("1518684079-3c830dcef090", 2400), // Dubai night skyline w/ Burj Khalifa
  nycAerial: unsplash("1564507592333-c60657eea523", 2400), // Burj Khalifa daytime tower

  // Chevron strip — Buy / Sell / Rent / Invest. Aspirational + varied.
  chev1: unsplash("1613490493576-7fde63acd811", 2000), // sweeping luxury mansion
  chev2: unsplash("1600573472550-8090b5e0745e", 2000), // warm modern interior
  chev3: unsplash("1486325212027-8081e485255e", 2000), // tall urban building looking up
  chev4: unsplash("1582407947304-fd86f028f716", 2000), // architectural exterior at dusk

  // AgentsPitch backdrop — Burj Khalifa close-up
  agentsPitch: unsplash("1564507592333-c60657eea523", 2400),

  // Service words backgrounds (Buy / Sell / Rent)
  serviceBuy: unsplash("1600607687939-ce8a6c25118c", 2200),
  serviceSell: unsplash("1600585154526-990dced4db0d", 2200),
  serviceRent: unsplash("1502672260266-1c1ef2d93688", 2200),

  // Service cards (Mortgage / PM / Construction)
  cardMortgage: unsplash("1554224155-6726b3ff858f", 1600), // documents
  cardPM: unsplash("1560448204-e02f11c3d0e2", 1600), // property mgmt
  cardConstruction: unsplash("1503387762-592deb58ef4e", 1600), // construction

  // Blog
  blog1: unsplash("1560518883-ce09059eeffa", 1600),
  blog2: unsplash("1600573472550-8090b5e0745e", 1600),
  blog3: unsplash("1494526585095-c41746248156", 1600),

  // Agents portraits — professional headshots
  agentA: unsplash("1573497019940-1c28c88b4f3e", 900), // woman
  agentB: unsplash("1560250097-0b93528c311a", 900), // man suit
  agentC: unsplash("1494790108377-be9c29b29330", 900), // woman
  agentD: unsplash("1507003211169-0a1dd7228f2d", 900), // man portrait
  agentE: unsplash("1438761681033-6461ffad8d80", 900), // woman portrait
  agentF: unsplash("1500648767791-00dcc994a43e", 900), // man
  agentG: unsplash("1580489944761-15a19d654956", 900), // woman
  agentH: unsplash("1492562080023-ab3db95bfbce", 900), // man

  // Testimonial avatars
  testA: unsplash("1488161628813-04466f872be2", 480),
  testB: unsplash("1531746020798-e6953c6e8e04", 480),
  testC: unsplash("1487412720507-e7ab37603c6f", 480),

  // About / team
  aboutHero: unsplash("1497366216548-37526070297c", 2400), // modern office interior
  aboutTeam: unsplash("1573164574472-797cdf4a583a", 2200), // team in office
  aboutValues: unsplash("1497366754035-f200968a6e72", 2200),

  // Apply hero
  applyHero: unsplash("1554469384-e58fac16e23a", 2200), // skyline / aspirational

  // Paperwork
  paperHero: unsplash("1450101499163-c8848c66ca85", 2200),

  // Generic listing thumbnails for agents
  thumb1: unsplash("1605276374104-dee2a0ed3cd6", 1200),
  thumb2: unsplash("1613553474179-e1eda3ea5734", 1200),

  // 404
  notFound: unsplash("1502672260266-1c1ef2d93688", 1800),

  // Pexels HD videos (direct CDN — free for use)
  videoCity:
    "https://videos.pexels.com/video-files/2103099/2103099-uhd_2560_1440_30fps.mp4",
  videoBuilding:
    "https://videos.pexels.com/video-files/5077057/5077057-uhd_2732_1440_25fps.mp4",
  videoInterior:
    "https://videos.pexels.com/video-files/3773486/3773486-uhd_2560_1440_30fps.mp4",
  videoAerial:
    "https://videos.pexels.com/video-files/4625747/4625747-uhd_2732_1440_30fps.mp4",

  // Cloud / sky timelapse (110s loop) — Pexels video #17302276, hero backdrop
  cloudVideoHd:
    "https://videos.pexels.com/video-files/17302276/17302276-hd_1920_1080_30fps.mp4",
  cloudVideoSd:
    "https://videos.pexels.com/video-files/17302276/17302276-hd_1280_720_30fps.mp4",
  cloudVideoPoster:
    "https://images.pexels.com/videos/17302276/pexels-photo-17302276.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920",
} as const;
