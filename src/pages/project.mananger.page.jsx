import { ManangerTemplate } from "../componentes/template/Mananger";
import { useManangerPage } from "../hooks/useManangerPage";
import { types } from "../componentes/molecules/InputSwitch";
import { GET_PROJECTS_TEST } from "../graphql/querys/projectQuery";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "../graphql/mutation/projectMutation";
import { Loading } from "../componentes/atoms/Loading";

const title = "Project Mananger";

const form = [
  { type: types.TEXT, name: "title" },
  { type: types.TEXT, name: "titleSeo" },
  { type: types.TEXTAREA, name: "summary" },
  { type: types.TEXTAREA, name: "description" },
  {
    type: types.SELECT,
    name: "language",
    options: [
      { value: "EN", name: "en" },
      { value: "ES", name: "es" },
    ],
  },
];

const get = {
  query: GET_PROJECTS_TEST,
  variables: {},
};

export const ProjectManangerPage = () => {
  const {
    error,
    loading,
    data,
    handleSubmit,
    handleEdit,
    handleDelete,
    edit,
    setEdit,
  } = useManangerPage(form, get, ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT);
  if (error) return <p>Error get project graphql</p>;
  if (loading) return <Loading />;
  return (
    <ManangerTemplate
      title={title}
      form={{ inputs: [...form], edit, setEdit, handleSubmit }}
      table={{ items: [...data.projects], handleEdit, handleDelete }}
    />
  );
};
