package pl.wsei.lublin.apptesting.testingweb5;

public class UserNotFoundException  extends RuntimeException {

        private static final long serialVersionUID = 3873418545077760440L;

        private final Integer userId;

        public UserNotFoundException(String message, Integer userId) {
            super(message);
            this.userId = userId;
        }

        public Integer getUserId() {
            return userId;
        }
}
