import { showAdminLayout } from "./admin/layout.admin";
import { authorButtons } from "./admin/authors.admin";
import { educationAdmin } from "./admin/educations.admin";
import { rewardAdmin } from "./admin/rewards.admin";
import { exhibitionAdmin } from "./admin/exhibitions.admin";
import { downloadPhoto } from "./admin/photos.admin";

showAdminLayout();
authorButtons();
educationAdmin();
rewardAdmin();
exhibitionAdmin();
downloadPhoto();