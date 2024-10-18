import React from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useStyles from "../../../styles/style";
import { RiCloseCircleFill } from "react-icons/ri"
import { IconButton } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LoadingButton } from "@mui/lab";
import newclasess from '@/styles/customstyle.module.scss'
import Box from "@mui/material/Box";
const ReportReviewPopup = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button className={classes.WriteReviewBtn_Color} variant="outlined" onClick={handleClickOpen}>
                Report
            </Button>
            <Dialog open={open} onClose={handleClose} className={classes.WriteReviewDialog}>
              
                        <div className={newclasess.reportReviewContainer}>
                            <div className={newclasess.closeBtnAndHeading}>
                                    <h2 className={newclasess.reportPopupHeading}>{`Report Review`}</h2>
                                    <IconButton onClick={handleClose}><RiCloseCircleFill /></IconButton>
                            </div>
                            <form>
                                <div className={`${newclasess.reportReviewContentContainer}`}>

                                    <div className="col-12">
                                        <FormGroup>
                                            <FormControlLabel
                                           
                                                control={<Checkbox
                                                    className={classes.reportCheckBox}
                                                />}
                                                label={<div className={newclasess.reportReviewFirstLAbelDiv}>
                                                    <h5 className={newclasess.reportReviewfirstLabel}> {`Review is from a bot, a fake account or contains ads and promotions`}</h5>
                                                </div>} />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    className={classes.reportCheckBox}
                                                />}
                                                label={
                                                    <div className={newclasess.headingTypeLabelContainer}>
                                                        <h5 className={newclasess.HeadingTypeLabel}>{`Bullying or harassment`}</h5>
                                                        <h5 className={newclasess.HeadingTypeReview_subLabel}>{`Review personally attacks a specific individual`}</h5>
                                                    </div>

                                                } />
                                            <FormControlLabel
                                                className={classes.reportCheckBox}
                                                control={<Checkbox />}
                                                label={
                                                    <div className={newclasess.headingTypeLabelContainer}>
                                                        <h5 className={newclasess.HeadingTypeLabel}>{`Discrimination or hate speech`}</h5>
                                                        <h5 className={newclasess.HeadingTypeReview_subLabel}> {`Review has harmful language about an individual or group based on identity`}</h5>
                                                    </div>
                                                } />
                                            <FormControlLabel
                                                className={classes.reportCheckBox}
                                                control={<Checkbox />}
                                                label={
                                                    <div className={newclasess.headingTypeLabelContainer}>
                                                        <h5 className={newclasess.HeadingTypeLabel}>{`Personal information`}</h5>
                                                        <h5 className={newclasess.HeadingTypeReview_subLabel}>{`Review contains personal information, such as an address or phone number`}</h5>
                                                    </div>
                                                } />
                                            <FormControlLabel
                                                className={classes.reportCheckBox}
                                                control={<Checkbox />}
                                                label={
                                                    <div  className={newclasess.headingTypeLabelContainer}>
                                                        <h5 className={newclasess.HeadingTypeLabel}>{`Not helpful`}</h5>
                                                        <h5 className={newclasess.HeadingTypeReview_subLabel}>{`Review doesn’t help people decide whether to go to this place`}</h5>
                                                    </div>
                                                } />
                                        </FormGroup>
                                    </div>
                                    <div className="d-flex gap-3 justify-content-end">
                                        <Box
                                            className={`mt-4 ${classes.reportReviewPopupCancelBtn}`}
                                        >
                                            <LoadingButton variant="outlined" onClick={handleClose}> Cancel</LoadingButton>
                                        </Box>
                                        <Box
                                            className={`mt-4 ${classes.reportSubmitBtn}`}
                                        >
                                            <LoadingButton variant="outlined" type="submit"> Submit</LoadingButton>
                                        </Box>
                                    </div>
                                </div>
                            </form>
                        </div>
                   
            </Dialog>

        </React.Fragment>
    )
}
export default ReportReviewPopup