import { Tag } from "@chakra-ui/react";

function GreenTag({ children }) {
    return (
        <Tag borderRadius="full" ml={2} color="white" fontWeight="600" backgroundColor="lightgreen">
            {children}
        </Tag>
    )
}

export default GreenTag;