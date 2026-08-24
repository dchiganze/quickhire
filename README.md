# QuickHire Vendor Mobile

Vendor operations app for managing vehicles, availability, and bookings.

## GitHub Actions

Every push or pull request targeting `main` runs the mobile typecheck and creates
both iOS and Android Expo Go bundle artifacts. The build output is available
from the workflow run under **Artifacts**.

The workflow uses the repository variable `EXPO_PUBLIC_DOMAIN` when it is set.
Otherwise it uses the current QuickHire production domain.