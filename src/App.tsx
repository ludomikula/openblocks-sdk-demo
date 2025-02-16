import { useEffect } from "react";
import {
  createHashRouter,
  NavLink,
  Outlet,
  RouteObject,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AppDemo } from "./AppDemo";
import { ModuleDemo } from "./ModuleDemo";
import formDsl from "./dsl/form.json";

const demos = [
  {
    title: "basic crud",
    appId: "6374b8dbc23a1103804cc23e",
  },
  {
    title: "Simple table horizontal scroll and pagination demo",
    appId: "6377695dc54c5224c70e9770",
  },
  {
    title: "Pagination with temporary state demo",
    appId: "6379cdd9f02c6e6ecc1d37ff",
  },
  {
    title: "Use module as ui component",
    appId: "637dc058a899fe1ffcb1589a",
    isModule: true,
    initialMethodName: "clearForm",
    initialInputs: { formTitle: "Student info" },
  },
  {
    title: "Use offline application dsl",
    dsl: formDsl,
    isModule: true,
    initialMethodName: "setNameFieldValue",
    initialMethodParams: JSON.stringify(["Tom"]),
  },
];

function titleToPath(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

function Root() {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      nav(titleToPath(demos[0].title));
    }
  }, [nav, location]);

  return (
    <div>
      <div className="nav">
        {demos.map((i) => (
          <NavLink key={i.appId} to={titleToPath(i.title)}>
            {i.title}
          </NavLink>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: demos.map((i, idx) => ({
      path: titleToPath(i.title),
      element: i.isModule ? (
        <ModuleDemo
          key={idx}
          appId={i.appId || ""}
          appDsl={i.dsl}
          initialModuleInputs={i.initialInputs}
          initialMethodName={i.initialMethodName || ""}
          initialMethodParams={i.initialMethodParams}
        />
      ) : (
        <AppDemo key={idx} appId={i.appId || ""} appDsl={i.dsl} />
      ),
    })),
  },
];

const router = createHashRouter(routes);

function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
