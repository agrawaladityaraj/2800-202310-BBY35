import {
  Stepper,
  StepperProps,
  createStyles,
  getStylesRef as getRef,
} from "@mantine/core";

const useStyles = createStyles((theme, _) => ({
  root: {
    // padding: theme.spacing.md,
    padding: "2em",
    // backgroundColor:
    //   theme.colorScheme === "dark"
    //     ? theme.colors.dark[6]
    //     : theme.colors.gray[0],
  },

  separator: {
    height: 2,
    borderTop: `2px dashed ${
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4]
    }`,
    borderRadius: theme.radius.xl,
    backgroundColor: "transparent",
  },

  separatorActive: {
    borderWidth: 0,
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colors.blue[6],
      theme.colors.cyan[6]
    ),
  },

  stepIcon: {
    ref: getRef("stepIcon"),
    borderColor: "transparent",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.white,
    borderWidth: 0,
  },

  step: {
    transition: "transform 150ms ease",
  },

  stepProgress: {
    transform: "scale(1.05)",

    [`& .${getRef("stepIcon")}`]: {},
  },

  stepCompleted: {
    [`& .${getRef("stepIcon")}`]: {
      borderWidth: 0,
      backgroundColor: "transparent",
      backgroundImage: theme.fn.linearGradient(
        45,
        theme.colors.blue[6],
        theme.colors.cyan[6]
      ),
    },
  },

  content: {
    paddingTop: "3em",
  },
}));

export default function StyledStepper(props: StepperProps) {
  const { classes } = useStyles();
  return <Stepper classNames={classes} {...props} />;
}
