import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
	orange: {
		backgroundColor: "#f49231",
		padding: "3em 8em",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		justifyContent: "center",
		color: "white",
		fontFamily: "Montserrat, sans-serif",
		fontSize: "2.5rem",
		height: "25vh",
		[useTheme().breakpoints.down("md")]: {
			fontSize: "1.5rem",
			padding: "1em",
		},
	},
	textBox: {
		fontFamily: "Montserrat, sans-serif",
		fontSize: "1.9rem",
	},
	blueText: {
		color: "#043e54",
		fontSize: "2rem",
		[useTheme().breakpoints.down("md")]: {
			fontSize: "1rem",
		},
	},
}));

function TextAutores() {
	const classes = useStyles();
	return (
		<section className={classes.orange}>
			<p className={classes.textBox}>
				¡ALTO AHÍ EDITORIALES!
				<br />
				<span className={classes.blueText}>
					Ofrecemos Paquetes Especiales Para Ustedes
				</span>
			</p>
		</section>
	);
}

export default TextAutores;
