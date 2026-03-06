# Add Enterprise-Grade Password Manager Project (updated)

## Overview
Add the "Enterprise-Grade Password Manager" project to the portfolio with the user-provided copy, a full modal (Technical Implementation, Features, Built With), and a 3-image gallery using the provided screenshots.

## Project card and modal content (user-provided)

- **Title:** Enterprise-Grade Password Manager
- **Short description (card):** Developed a secure, local-first password management system implementing industry-standard cryptographic protocols. The application prioritizes security, usability, and complete user privacy.
- **Modal content:**
  - **Intro:** Same as short description (local-first, industry-standard crypto, security/usability/privacy).
  - **Technical Implementation:** Encryption: AES-256-CBC via Fernet (authenticated encryption); Key Derivation: PBKDF2-HMAC-SHA256 with 480,000 iterations; Security: Unique salt per installation, cryptographically secure random (secrets module); Architecture: Modular design, separation of concerns (encryption, storage, UI); Deployment: Standalone executable via PyInstaller for cross-machine portability.
  - **Features:** Password generation, strength analysis algorithm, category management, encrypted backup/restore, comprehensive error handling, professional terminal UI.
  - **Built With:** Python 3.14, Cryptography (Fernet), PyInstaller, Colorama, Tabulate.
- **Tags (card + modal pills):** Python 3.14, Cryptography (Fernet), PyInstaller, Colorama, Tabulate
- **Images:** 3 screenshots — (1) IDE with `password_menager.py` / `generate_password` code, (2) README.MD content, (3) Terminal "Password Menager" setup screen. Store in `assets/password-manager/` as e.g. `code-view.png`, `readme.png`, `terminal-setup.png`. Copy from workspace-saved paths if they exist.

## Implementation steps

1. **Assets**  
   Create `assets/password-manager/` and add the three screenshots with friendly names. If the images were saved under the long `assets/c__Users_...` paths, copy them into `assets/password-manager/` as `code-view.png`, `readme.png`, `terminal-setup.png`.

2. **index.html (DE)**  
   - Add project card before the "COPY THIS BLOCK" comment: `data-modal-target="python-password-manager-modal"`, title "Enterprise-Grade Password Manager", German short description, tags.  
   - Add full modal (after Version Control modal, before Image Lightbox) with id `python-password-manager-modal`: modal-body with modal-info (subtitle, Technical Implementation, Features, Built With pills) and modal-media with `password-manager-gallery` (3 img tags) and `password-manager-error-msg` fallback.  
   - In `checkAllImages()`, add a block for `password-manager-gallery` / `password-manager-error-msg` (same pattern as warehouse-gallery).

3. **index-en.html (EN)**  
   - Add same project card with English short description and same tags.  
   - Add same modal structure with English copy.  
   - Extend `checkAllImages()` for password-manager gallery/error.

## Files to change

- [index.html](c:\NovumInitiumsoftwareSolutionsBylRam\index.html)
- [index-en.html](c:\NovumInitiumsoftwareSolutionsBylRam\index-en.html)
- New: `assets/password-manager/` + 3 images

## Validation

- New card appears in the grid; click opens modal with full content and three gallery images.
- If images are missing, the fallback message lists the expected filenames.
- ESC and close button work; scroll lock matches other modals.
