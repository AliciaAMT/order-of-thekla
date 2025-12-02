# Order of Thekla

**Node Version:** 22.18.0

A website controlled by custom headless CMS for the nuns of the Order of Thekla. This project serves as a digital platform for an Ecumenical order of nuns, women who have chosen to consecrate themselves to God, with intentions to live in poverty, faith, service, and obedience, living a celibate life and devoting oneself to prayer.

## About the Order

The image of Thekla is chosen as the name because like Thekla, many modern women are turned away and discouraged from consecrating themselves to God, but like Thekla, we do it anyway regardless of persecution or ridicule. We can support each other like the story of Thekla, whether truth or myth, has inspired countless others.

## Project Features

- **Blog**: Women's issues in faith
- **Recruitment Pages**: Information for those interested in joining the order
- **Information Pages**: About the order, its mission, and values
- **Online Community**: For isolated or solo nuns to commune with others online
- **Virtual Meetings**: Zoom or similar platform integration for community gatherings

## Technology Stack

- **Framework**: Angular 20.0.0 with Ionic 8.0.0
- **Build Tool**: Angular CLI
- **Package Manager**: npm
- **Testing**: Jasmine/Karma
- **Linting**: ESLint with Angular-specific rules

## Getting Started

### Prerequisites

- Node.js 22.18.0
- npm (comes with Node.js)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd order-of-thekla
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Set up environment files** (Required for Firebase):
   ```bash
   # Copy example files to create your local environment files
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
   ```
   
   **⚠️ IMPORTANT:** To get Firebase credentials, contact **admin@accessiblewebmedia.com**
   
   See `src/environments/README.md` for detailed setup instructions.

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:4200`

### Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the project for production
- `npm run test` - Run unit tests
- `npm run lint` - Run linting

## Project Structure

```
order-of-thekla/
├── docs/           # Project documentation
├── proto/          # Prototype website and documentation
├── src/            # Source code
│   ├── app/        # Application components
│   ├── assets/     # Static assets
│   └── environments/ # Environment configuration
├── .gitignore      # Git ignore rules
├── package.json    # Dependencies and scripts
└── README.md       # This file
```

## Security

### Environment Files

**⚠️ CRITICAL:** Real Firebase credentials are never committed to the repository.

- Real environment files (`environment.ts`, `environment.prod.ts`) are excluded from git
- Only template/example files are committed
- To obtain credentials, contact: **admin@accessiblewebmedia.com**
- See `src/environments/README.md` for security guidelines

### Verifying Security

Run the security check script to ensure environment files are properly ignored:
```bash
./scripts/check-env-security.sh
```

## Contributing

### Development Workflow

1. **Branch Strategy**: Create a new branch when trying new dependencies or upgrading
2. **Testing**: All code must pass tests before pull requests are accepted
3. **Documentation**: Contributors must maintain good documentation
4. **Code Quality**: Follow the established linting rules and coding standards
5. **Security**: Never commit real environment files or credentials

### Before Contributing

- Read the contribution guidelines in the `docs/` directory
- Ensure all tests pass locally
- Update documentation as needed
- Follow the established code style

### Support and Contact

For contributors or those needing support:
- **Email**: support@orderofthekla.org or support@oneassembly.church
- **Issues**: Tracked in the GitHub project board
- **Pull Requests**: Must pass tests and maintain documentation

## License

This project operates under a **dual license system**:

### Code License: MIT License
The software code and technical documentation are licensed under the [MIT License](LICENSE), making them open source and freely available for use, modification, and distribution.

### Content License: Copyright Order of Thekla
All content, materials, and creative works are copyright © 2025 Order of Thekla. Permission must be requested before reproducing any content.

**For detailed licensing information, see:**
- [LICENSE](LICENSE) - MIT License for code
- [CONTENT_LICENSE.md](CONTENT_LICENSE.md) - Content usage and permissions

**Quick Reference:**
- ✅ **Code**: Open source, MIT licensed
- ❌ **Content**: Copyright protected, permission required
- 🤝 **Ministry Support**: Available for ministry technology projects

## Author

**Accessible Web Media** - https://accessiblewebmedia.com

---

*"For where two or three gather in my name, there am I with them." - Matthew 18:20*
