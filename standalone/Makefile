#
# Makefile for CuraEngine
#

BUILD_DIR = ../build
SRC_DIR = ../src
LIBS_DIR = ../libs

BUILD_TYPE = RELEASE

VERSION ?= DEV
CXX ?= g++
# CXX ?= em++
CFLAGS += -c -Wall -Wextra -Wold-style-cast -Woverloaded-virtual -std=c++11 -DVERSION=\"$(VERSION)\" -isystem libs
EXEFLAGS = -O2 -s DISABLE_EXCEPTION_CATCHING=0 -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s DEMANGLE_SUPPORT=1
# CFLAGS += -c -Wall -Wextra -Wold-style-cast -Woverloaded-virtual -std=c++11 -DVERSION=\"$(VERSION)\" -isystem libs

ifeq ($(BUILD_TYPE),DEBUG)
	# CFLAGS+=-ggdb -Og -g
endif
ifeq ($(BUILD_TYPE),PROFILE)
	# CFLAGS+= -pg
endif
ifeq ($(BUILD_TYPE),RELEASE)
	# CFLAGS+= -O3 -fomit-frame-pointer
endif

LDFLAGS += -Lbuild/ -lclipper

SOURCES_RAW = bridge.cpp comb.cpp gcodeExport.cpp infill.cpp inset.cpp layerPart.cpp main.cpp optimizedModel.cpp pathOrderOptimizer.cpp polygonOptimizer.cpp raft.cpp settings.cpp skin.cpp skirt.cpp slicer.cpp support.cpp timeEstimate.cpp
SOURCES_RAW += modelFile/modelFile.cpp utils/gettime.cpp utils/logoutput.cpp utils/socket.cpp
SOURCES = $(addprefix $(SRC_DIR)/,$(SOURCES_RAW))

OBJECTS_RAW = $(SOURCES_RAW:.cpp=.o)
OBJECTS = $(addprefix $(BUILD_DIR)/,$(OBJECTS_RAW))

DIRS = $(sort $(dir $(OBJECTS)))

EXECUTABLE = $(BUILD_DIR)/CuraEngine

ifeq ($(OS),Windows_NT)
	#For windows make it large address aware, which allows the process to use more then 2GB of memory.
	EXECUTABLE := $(EXECUTABLE).exe
	# CFLAGS += -march=pentium4 -flto
	# LDFLAGS += -Wl,--large-address-aware -lm -lwsock32 -flto
	MKDIR_PREFIX = mkdir -p
else
	MKDIR_PREFIX = mkdir -p
	UNAME := $(shell uname)
	ifeq ($(UNAME), Linux)
		OPEN_HTML=firefox
		ifeq ($(BUILD_TYPE),DEBUG)
			# LDFLAGS += --static
		else
			# CFLAGS += -flto
			# LDFLAGS += --static -flto
		endif
	endif
	ifeq ($(UNAME), OpenBSD)
		# LDFLAGS += -lm -lpthread
	endif
	ifeq ($(UNAME), Darwin)
		OPEN_HTML=open
		#For MacOS force to build
		# CFLAGS += -force_cpusubtype_ALL -mmacosx-version-min=10.6 -arch x86_64 -arch i386 LDFLAGS += -force_cpusubtype_ALL -mmacosx-version-min=10.6 -arch x86_64 -arch i386
		# CFLAGS += -force_cpusubtype_ALL 
		# LDFLAGS += -force_cpusubtype_ALL 
	endif
endif

all: $(DIRS) $(SOURCES) $(EXECUTABLE)

$(BUILD_DIR)/libclipper.a: $(LIBS_DIR)/clipper/clipper.cpp
	$(CXX) $(CFLAGS) -c  -o $(LIBS_DIR)/clipper/clipper.o $(LIBS_DIR)/clipper/clipper.cpp
	ar rsv $(BUILD_DIR)/libclipper.a $(LIBS_DIR)/clipper/clipper.o

$(EXECUTABLE): $(OBJECTS) $(BUILD_DIR)/libclipper.a
	$(CXX) $(OBJECTS) $(EXEFLAGS) $(LDFLAGS) --embed-file input
	# $(CXX) $(OBJECTS) $(EXEFLAGS) $(LDFLAGS) -o curaengine.raw.js --pre-js js/pre.js 

$(DIRS):
	-@$(MKDIR_PREFIX) $(DIRS)

$(BUILD_DIR)/%.o: $(SRC_DIR)/%.cpp
	$(CXX) $(CFLAGS) $< -o $@

test: $(EXECUTABLE)
	python tests/runtest.py $(abspath $(EXECUTABLE))

## clean stuff
clean:
	rm -f $(EXECUTABLE) $(OBJECTS) $(BUILD_DIR)/libclipper.a

help:
	@cat Makefile |grep \#\#| grep \: |cut -d\# -f3
