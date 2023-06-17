import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import PollMenu from "../components/feature/polls/PollMenu";
import CandidateMenu from "../components/feature/candidates/CandidateMenu";
import CreatePoll from "../components/feature/polls/CreatePoll";
import AddCandidate from "../components/feature/candidates/AddCandidate";
import AddVoters from "../components/feature/voters/AddVoters";
import PollDetail from "../components/feature/polls/PollDetail";
import CandidateDetail from "../components/feature/candidates/CandidateDetail";
import CandidateEdit from "../components/feature/candidates/CandidateEdit";
import PollEdit from "../components/feature/polls/PollEdit";
import VotersEdit from "../components/feature/voters/VotersEdit";
import Signin from "../views/auth/Signin";
import TestDataTable from "../components/feature/test/TestDataTable";
import Signout from "../views/auth/Signout";
import ProtectedRoutes from "./ProtectedRoutes";
import PollOption from "../components/feature/polls/PollOption";
import PollOptionCandidates from "../components/feature/candidates/PollOptionCandidates";
import { CandidateService } from "../services/api.service";
import PollOptionVoters from "../components/feature/voters/PollOptionVoters";
import VotersEventMenu from "../components/feature/voters/VotersEventMenu";
import VotersMenu from "../components/feature/voters/VotersMenu";
import VotePage from "../components/feature/voting_event/VotePage";
import Forbidden from "../errors/Forbidden";
import AdminRoutes from "./AdminRoutes";
import VoterRoutes from "./VoterRoutes";

const protectAdminRoute = (component) => {
  return <AdminRoutes>{component}</AdminRoutes>;
};

const protectVoterRoutes = (component) => {
  return <VoterRoutes>{component}</VoterRoutes>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: protectAdminRoute(<Dashboard></Dashboard>),
  },
  {
    path: "/polls",
    element: protectAdminRoute(<PollMenu />),
  },
  {
    path: "/candidates",
    element: protectAdminRoute(
      <PollOption detailComponent={<PollOptionCandidates />} />
    ),
  },
  {
    path: "/event/:eventId/candidates",
    element: protectAdminRoute(<CandidateMenu />),
    loader: ({ params }) => {
      return params;
    },
  },
  {
    path: "/voters",
    element: protectAdminRoute(<VotersMenu />),
  },
  {
    path: "/event/:eventId/voters",
    element: protectAdminRoute(<VotersEventMenu />),
    loader: ({ params }) => {
      return params;
    },
  },
  {
    path: "/createPoll",
    element: protectAdminRoute(<CreatePoll />),
  },
  {
    path: "/polls/:pollId/edit",
    element: <PollEdit />,
    loader: ({ params }) => {
      return params;
    },
  },
  {
    path: "/candidate/:eventId/create",
    element: protectAdminRoute(<AddCandidate />),
    loader: ({ params }) => {
      return params;
    },
  },
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/logout",
    element: <Signout />,
  },
  {
    path: "/vote",
    element: protectVoterRoutes(<VotePage />),
  },
  {
    path: "/test",
    element: <TestDataTable />,
  },
  {
    path: "/polls/:pollId/detail",
    element: <PollDetail />,
    loader: ({ params }) => {
      return params;
    },
  },
  {
    path: "/candidate/:candidateId/detail",
    element: protectAdminRoute(<CandidateDetail />),
    loader: ({ params }) => {
      return params; // TODO: nanti ganti dengan fetchnya axios untuk fetch detail data dari backend
    },
  },
  {
    path: "/voters/:voterId/edit",
    element: protectAdminRoute(<VotersEdit />),
    loader: ({ params }) => {
      return params;
    },
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
]);

export default router;
