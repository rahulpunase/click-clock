import { FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { ListItem } from "@/design-system/ui/List/List.Item";

import { DataModel } from "@db/_generated/dataModel";

const DocumentListItem = ({
  doc,
}: {
  doc: DataModel["documents"]["document"];
}) => {
  const location = useLocation();
  return (
    <ListItem
      icon={FileText}
      variant="nav"
      render={(props) => <Link to={`/doc/${doc._id}`} {...props} />}
      isSelected={location.pathname === `/doc/${doc._id}`}
    >
      <ListItem.Label>{doc.name === "" ? "Doc" : doc.name}</ListItem.Label>
    </ListItem>
  );
};

export default DocumentListItem;
