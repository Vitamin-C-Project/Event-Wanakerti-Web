import App from "@/app/app";
import LoginPage from "@/app/auth/login/page";
import RegisterPage from "@/app/auth/register/page";
import DivisionPage from "@/app/admin/division/division";
import ParticipantPage from "@/app/admin/member/participant/participant";
import SchoolPage from "@/app/admin/member/school/school";
import TeamPage from "@/app/admin/member/team/team";
import DashboardAdminPage from "@/app/admin/page";
import UserAdminPage from "@/app/admin/user/admin/user-admin";
import UserParticipantPage from "@/app/admin/user/participant/user-participant";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import EditSchoolPage from "@/app/admin/member/edit-school/edit-school";
import AppLayout from "@/app/layout/app-layout";
import MascotLogoPage from "@/app/admin/cms/mascot-logo/mascot-logo";
import AgendaPage from "@/app/admin/cms/agenda/agenda";
import CategoriesPage from "@/app/admin/cms/categories/categories";
import VideoPage from "@/app/admin/cms/video/video";
import BrandPage from "@/app/admin/cms/brand/brand";
import ContactPage from "@/app/admin/cms/contact/contact";
import ProtectedRoute from "./protected-route";
import { USER_TYPE_CONSTANT } from "@/constants/global_constant";
import ProfilePage from "@/app/admin/profile/profile";
import AssessmentTeamPage from "@/app/admin/user/assessment-team/assessment-team";
import ForgotPasswordPage from "@/app/auth/forgot-password/forgot-password";
import ResetPasswordPage from "@/app/auth/reset-password/reset-password";

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<App />} />

        <Route path="/auth" element={<AppLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<DashboardAdminPage />} />

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  USER_TYPE_CONSTANT.ADMIN,
                  USER_TYPE_CONSTANT.SUPER_ADMIN,
                ]}
              />
            }
          >
            <Route path="divisions" element={<DivisionPage />} />

            <Route path="users">
              <Route index element={<UserParticipantPage />} />
              <Route path="admin" element={<UserAdminPage />} />
              <Route path="participant" element={<UserParticipantPage />} />
              <Route path="assessment-team" element={<AssessmentTeamPage />} />
            </Route>

            <Route path="cms">
              <Route index element={<MascotLogoPage />} />
              <Route path="mascot-logo" element={<MascotLogoPage />} />
              <Route path="agenda" element={<AgendaPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="video" element={<VideoPage />} />
              <Route path="brand-sponsorship" element={<BrandPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            <Route path="member/schools" element={<SchoolPage />} />
          </Route>

          <Route path="member">
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[USER_TYPE_CONSTANT.PARTICIPANT]}
                />
              }
            >
              <Route path="edit-school" element={<EditSchoolPage />} />
            </Route>
            <Route path="teams" element={<TeamPage />} />
            <Route path="participants" element={<ParticipantPage />} />
            <Route index element={<ParticipantPage />} />
          </Route>

          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
}
