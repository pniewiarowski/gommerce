import { Box, FormControl, Typography } from "@mui/material";
import { AddressForm } from "../../../organism";

const AddressTab = () => {
    return (
        <Box>
            <FormControl sx={{ ml: 4, mb: 2, mt: 2 }} fullWidth>
                <Typography variant="h3">update address</Typography>
            </FormControl>
            <AddressForm scope="update-form" />
        </Box>
    );
}

export default AddressTab;
