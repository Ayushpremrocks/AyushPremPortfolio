// src/data/projects.js
// Project data for the portfolio

export const projects = [
  {
    id: 1,
    title: "FinSight",
    subtitle: "Financial Dashboard",
    description:
      "Personal finance tracking with glassmorphism UI and real-time analytics. Visualize spending patterns, set budget goals, and gain actionable insights.",
    techStack: ["Java 21", "Spring Boot", "Spring Security", "React", "Recharts"],
    github: "https://github.com/ayushprem/finsight",
    demo: "#",
    featured: true,
    color: "#00fff2",
    deepDive: {
      enabled: true,
      content: [
        {
          heading: "Authentication Architecture",
          text: "Implemented JWT-based auth with Spring Security featuring stateless sessions, refresh token rotation, and role-based access control (RBAC). Custom `OncePerRequestFilter` validates tokens on every request.",
          code: `// JwtAuthFilter.java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
  @Override
  protected void doFilterInternal(HttpServletRequest req,
      HttpServletResponse res, FilterChain chain)
      throws ServletException, IOException {
    String token = extractToken(req);
    if (token != null && jwtService.isTokenValid(token)) {
      SecurityContextHolder.getContext()
        .setAuthentication(buildAuth(token));
    }
    chain.doFilter(req, res);
  }
}`,
        },
        {
          heading: "Custom Recharts Visualizations",
          text: "Built composable chart components with Recharts — animated area charts for spending trends, custom tooltips with formatted currency, and a responsive pie chart for category breakdown.",
        },
        {
          heading: "Database Schema",
          text: "MySQL with optimized indexes on `user_id` + `date` composite key for fast transaction queries. Spring Data JPA with custom JPQL for aggregation reports.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Civix",
    subtitle: "Civic Engagement Platform",
    description:
      "Full-stack SaaS platform for community petitions and civic engagement. Led a 3-member team through design, development, and deployment during Infosys Springboard Internship.",
    techStack: ["Node.js", "Express", "MongoDB", "React", "JWT"],
    github: "https://github.com/ayushprem/civix",
    demo: "#",
    caseStudy: "#",
    featured: true,
    color: "#b06aff",
    meta: "Nov 2025 – Jan 2026 · Team Lead · 3 members",
    deepDive: null,
  },
  {
    id: 3,
    title: "Ignite.fence",
    subtitle: "IoT Monitoring System",
    description:
      "Real-time fence breach detection using ESP32 microcontrollers with MQTT-based alert delivery. Winner of Tekathon 4.0 — competed against 200+ teams.",
    techStack: ["ESP32", "Arduino", "C++", "MQTT", "Node.js"],
    github: "https://github.com/ayushprem/ignite-fence",
    demo: "#",
    demoVideo: "#",
    featured: true,
    color: "#ff6b35",
    meta: "Sept 2025 · 🏆 Tekathon 4.0 Winner",
    deepDive: null,
  },
];
