import { Typography } from "@mui/material"

export const Heading = ({ label }: { label: string }) => {
    return <Typography variant="h4" align="center" gutterBottom>
        {label}
    </Typography>
}