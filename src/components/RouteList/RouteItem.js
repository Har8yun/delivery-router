import {
    ListItem,
    List,
    Chip,
    Box,
    IconButton,
    ListItemButton,
    ListItemText,
    Collapse,
    Paper,
    CircularProgress
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import {useCallback, useContext, useMemo, useState} from "react";
import {lightBlue, grey, indigo} from "@mui/material/colors";
import {StepsContext} from "../../context/StepsContextProvider";
import {MESSAGES} from "../messages";
import {setStopCompletedRequest} from "../../services/api/stepsService";

const bgColor = lightBlue[50];
const numberBgColor = grey[200];
const completedNumber = indigo.A700;

const RouteItem = ({sequence_number, city, street, eta, zip, time_window, completed}) => {
    const {setOpenedStepId, openedStepId, setCompletedStop} = useContext(StepsContext);
    const handleClick = useCallback(() => setOpenedStepId(sequence_number), [sequence_number, setOpenedStepId]);
    const isOpen = useMemo(() => openedStepId === sequence_number, [openedStepId, sequence_number])
    const [isLoading, setIsLoading] = useState(false);

    const handleComplete = useCallback(() => {
        setIsLoading(true);
        setStopCompletedRequest()
            .then((isCompleted) => {
                if (isCompleted) {
                    setCompletedStop(sequence_number);
                }
            })
            .catch((er) => {
                console.log("something went wrong", er);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [sequence_number, setCompletedStop])

    const mapUrl = useMemo(() => {
        const destination = encodeURIComponent(`${zip},${street},${city}`);
        return `https://www.google.com/maps/search/?api=1&travelmode=driving&query=${destination}`;
    }, [city, street, zip]);

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={handleClick} disabled={completed}>
                    <ListItemText
                        primary={
                            <Box component="span" sx={{display: "flex", justifyContent: "space-between"}}>
                                <Typography
                                    component="span"
                                >
                                    <Paper
                                        component="span"
                                        sx={{
                                            width: "fit-content",
                                            padding: "0.125rem 0.5rem",
                                            bgcolor: numberBgColor,
                                            fontWeight: "500",
                                            color: isOpen ? completedNumber : "inherit",
                                        }}
                                        elevation={0}
                                    >
                                        {sequence_number}
                                    </Paper> {street}
                                </Typography>
                                <Typography
                                    component="span"
                                    sx={{display: "flex"}}
                                >
                                    {completed &&
                                        <DoneAllIcon color="success" fontSize="small" sx={{marginRight: "0.5rem"}}/>
                                    }
                                    {eta}
                                </Typography>
                            </Box>
                        }
                        secondary={
                            <Box component="span" sx={{display: "flex", justifyContent: "space-between"}}>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color={`text.${isOpen ? "primary" : "secondary"}`}
                                >
                                    {zip} {city}
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color={`text.${isOpen ? "primary" : "secondary"}`}
                                >
                                    {time_window}
                                </Typography>
                            </Box>
                        }
                    />
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" sx={{margin: 0}}/>
            <Collapse
                in={isOpen}
                timeout="auto"
                unmountOnExit
                sx={{backgroundColor: bgColor}}
            >
                <List disablePadding>
                    <ListItem>
                        <IconButton
                            component="a"
                            href={mapUrl}
                            target="_blank"
                            aria-label="go to map"
                            sx={{marginRight: "1rem"}}
                        >
                            <AssistantDirectionIcon
                                fontSize="large"
                                color="primary"
                            />
                        </IconButton>

                        <Chip
                            disabled={isLoading}
                            onClick={handleComplete}
                            component="button"
                            label={MESSAGES.COMPLETE}
                            icon={isLoading
                                ? <CircularProgress size={"1.5rem"}/>
                                : <DoneAllIcon color="success"/>
                            }
                            sx={{"&:hover": {cursor: "pointer"}}}
                        />
                    </ListItem>
                </List>
                <Divider/>
            </Collapse>
            <Divider variant="inset" component="li" sx={{margin: 0}}/>
        </>
    );
};

export default RouteItem;
