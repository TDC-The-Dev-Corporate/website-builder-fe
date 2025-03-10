// import { Template } from '../types';

// export const templates: Template[] = [
//   {
//     id: 'minimal',
//     name: 'Minimal',
//     thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
//     layout: {
//       sections: [
//         {
//           id: 'hero',
//           type: 'hero',
//           content: {
//             heading: 'John Doe',
//             subheading: 'Full Stack Developer',
//             image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
//           },
//           styles: {
//             backgroundColor: 'bg-white',
//             textColor: 'text-gray-900'
//           }
//         },
//         {
//           id: 'about',
//           type: 'about',
//           content: {
//             heading: 'About Me',
//             description: 'Passionate developer with experience in web technologies.'
//           },
//           styles: {
//             backgroundColor: 'bg-gray-50',
//             padding: 'py-16'
//           }
//         }
//       ],
//       styles: {
//         fontFamily: 'inter'
//       }
//     }
//   },
//   {
//     id: 'creative',
//     name: 'Creative Portfolio',
//     thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
//     layout: {
//       sections: [
//         {
//           id: 'hero',
//           type: 'hero',
//           content: {
//             heading: 'Sarah Anderson',
//             subheading: 'UI/UX Designer & Creative Director',
//             image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
//           },
//           styles: {
//             backgroundColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
//             textColor: 'text-white'
//           }
//         },
//         {
//           id: 'about',
//           type: 'about',
//           content: {
//             heading: 'Creating Digital Experiences',
//             description: 'With over 8 years of experience in digital design, I specialize in creating intuitive and engaging user experiences that bridge the gap between user needs and business goals. My approach combines aesthetic excellence with functional design thinking.'
//           },
//           styles: {
//             backgroundColor: 'bg-white',
//             padding: 'py-20'
//           }
//         },
//         {
//           id: 'projects',
//           type: 'projects',
//           content: {
//             heading: 'Featured Work',
//             projects: [
//               {
//                 title: 'E-commerce Redesign',
//                 description: 'Complete overhaul of a major retail platform',
//                 image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
//               },
//               {
//                 title: 'Healthcare App',
//                 description: 'User-centered medical appointment system',
//                 image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d'
//               }
//             ]
//           },
//           styles: {
//             backgroundColor: 'bg-gray-50',
//             padding: 'py-16'
//           }
//         }
//       ],
//       styles: {
//         fontFamily: 'poppins'
//       }
//     }
//   },
//   {
//     id: 'professional',
//     name: 'Professional',
//     thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
//     layout: {
//       sections: [
//         {
//           id: 'hero',
//           type: 'hero',
//           content: {
//             heading: 'Michael Chen',
//             subheading: 'Senior Software Architect',
//             image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
//           },
//           styles: {
//             backgroundColor: 'bg-slate-900',
//             textColor: 'text-white'
//           }
//         },
//         {
//           id: 'about',
//           type: 'about',
//           content: {
//             heading: 'Technical Leadership & Innovation',
//             description: 'Specialized in cloud architecture and distributed systems with a track record of leading high-performance engineering teams. Experienced in designing scalable solutions for enterprise clients across finance, healthcare, and e-commerce sectors.'
//           },
//           styles: {
//             backgroundColor: 'bg-white',
//             padding: 'py-16'
//           }
//         },
//         {
//           id: 'experience',
//           type: 'about',
//           content: {
//             heading: 'Professional Experience',
//             description: '• Lead Architect at TechCorp (2020-Present)\n• Senior Developer at CloudScale Solutions (2017-2020)\n• Systems Engineer at DataTech Industries (2015-2017)\n\nSpecialties: Cloud Architecture, Microservices, DevOps, System Design'
//           },
//           styles: {
//             backgroundColor: 'bg-gray-50',
//             padding: 'py-16'
//           }
//         }
//       ],
//       styles: {
//         fontFamily: 'inter'
//       }
//     }
//   },
//   {
//     id: 'modern-nav',
//     name: 'Modern with Navigation',
//     thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d',
//     layout: {
//       navigation: {
//         type: 'navbar',
//         items: [
//           { label: 'Home', href: '#home' },
//           { label: 'About', href: '#about' },
//           { label: 'Projects', href: '#projects' },
//           { label: 'Contact', href: '#contact' }
//         ],
//         styles: {
//           backgroundColor: 'bg-white',
//           textColor: 'text-gray-800',
//           activeColor: 'text-blue-600'
//         }
//       },
//       sections: [
//         {
//           id: 'hero',
//           type: 'hero',
//           content: {
//             heading: 'Alex Rivera',
//             subheading: 'Product Designer & Developer',
//             image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04'
//           },
//           styles: {
//             backgroundColor: 'bg-gradient-to-br from-blue-500 to-purple-600',
//             textColor: 'text-white'
//           }
//         },
//         {
//           id: 'about',
//           type: 'about',
//           content: {
//             heading: 'Design Meets Development',
//             description: 'Bridging the gap between design and development with over 6 years of experience creating beautiful, functional digital products. Specialized in UI/UX design and front-end development.'
//           },
//           styles: {
//             backgroundColor: 'bg-white',
//             padding: 'py-20'
//           }
//         },
//         {
//           id: 'projects',
//           type: 'projects',
//           content: {
//             heading: 'Recent Projects',
//             projects: [
//               {
//                 title: 'Social Platform UI',
//                 description: 'Modern social media interface redesign',
//                 image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293'
//               },
//               {
//                 title: 'Finance Dashboard',
//                 description: 'Complex data visualization platform',
//                 image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
//               }
//             ]
//           },
//           styles: {
//             backgroundColor: 'bg-gray-50',
//             padding: 'py-16'
//           }
//         }
//       ],
//       styles: {
//         fontFamily: 'inter'
//       }
//     }
//   },
//   {
//     id: 'drawer-portfolio',
//     name: 'Drawer Menu Portfolio',
//     thumbnail: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d',
//     layout: {
//       navigation: {
//         type: 'drawer',
//         items: [
//           { label: 'Home', href: '#home' },
//           { label: 'About', href: '#about' },
//           { label: 'Experience', href: '#experience' },
//           { label: 'Projects', href: '#projects' },
//           { label: 'Contact', href: '#contact' }
//         ],
//         styles: {
//           backgroundColor: 'bg-gray-900',
//           textColor: 'text-gray-300',
//           activeColor: 'text-white bg-gray-800'
//         }
//       },
//       sections: [
//         {
//           id: 'hero',
//           type: 'hero',
//           content: {
//             heading: 'Emma Thompson',
//             subheading: 'Creative Technologist',
//             image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
//           },
//           styles: {
//             backgroundColor: 'bg-black',
//             textColor: 'text-white'
//           }
//         },
//         {
//           id: 'about',
//           type: 'about',
//           content: {
//             heading: 'Innovation Through Technology',
//             description: 'Exploring the intersection of art and technology to create immersive digital experiences. Specialized in interactive installations, AR/VR experiences, and creative coding.'
//           },
//           styles: {
//             backgroundColor: 'bg-white',
//             padding: 'py-20'
//           }
//         },
//         {
//           id: 'projects',
//           type: 'projects',
//           content: {
//             heading: 'Featured Installations',
//             projects: [
//               {
//                 title: 'Interactive Museum Display',
//                 description: 'Digital art installation with motion sensors',
//                 image: 'https://images.unsplash.com/photo-1561316901-c5d62b859792'
//               },
//               {
//                 title: 'VR Experience',
//                 description: 'Virtual reality art gallery',
//                 image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac'
//               }
//             ]
//           },
//           styles: {
//             backgroundColor: 'bg-gray-900',
//             textColor: 'text-white',
//             padding: 'py-16'
//           }
//         }
//       ],
//       styles: {
//         fontFamily: 'inter'
//       }
//     }
//   }
// ];
