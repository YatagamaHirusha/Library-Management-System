package org.hirusha.library.Exception;

public class NoRecordFound extends RuntimeException {
    public NoRecordFound(String message) {
        super(message);
    }
    public NoRecordFound(){
      super("No record found");
    }
}
